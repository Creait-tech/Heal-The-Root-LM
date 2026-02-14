import type {
  Answer,
  ScenarioAnswer,
  SliderAnswer,
  IdentityType,
  NervousSystemState,
  ScoringResult,
  CombinationKey,
} from './types';
import {
  IDENTITY_DISPLAY_NAMES,
  NS_DISPLAY_NAMES,
  NS_SHORT_NAMES,
} from './types';

/**
 * Calculate the full scoring result from assessment answers.
 *
 * Scoring algorithm:
 * 1. Tally scenario answers (each maps to an identity type, +1 each)
 * 2. Add identity slider values (0-5 scale) to identity tallies
 * 3. Tally NS slider values by state (3 questions per state, 0-5 each, max 15 per state)
 * 4. Rank identities and NS states
 * 5. Determine combination key (primary identity + dominant non-ventral NS state)
 */
export function calculateResults(answers: Answer[]): ScoringResult {
  // ------------------------------------------------------------------
  // Step 1: Tally scenario selections (questions S1-S10)
  // ------------------------------------------------------------------
  const identityTally: Record<IdentityType, number> = {
    ACHIEVER: 0,
    ANCHOR: 0,
    OPERATOR: 0,
    STRATEGIST: 0,
    BURNER: 0,
  };

  const scenarioAnswers = answers.filter(
    (a): a is ScenarioAnswer => a.type === 'scenario'
  );

  for (const answer of scenarioAnswers) {
    identityTally[answer.selectedIdentity] += 1;
  }

  // ------------------------------------------------------------------
  // Step 2: Add identity slider values (questions IS1-IS5)
  // ------------------------------------------------------------------
  const identitySliderAnswers = answers.filter(
    (a): a is SliderAnswer => a.type === 'identity-slider'
  );

  // Map slider question IDs to identity types
  const identitySliderMap: Record<string, IdentityType> = {
    IS1: 'ACHIEVER',
    IS2: 'ANCHOR',
    IS3: 'OPERATOR',
    IS4: 'STRATEGIST',
    IS5: 'BURNER',
  };

  for (const answer of identitySliderAnswers) {
    const identityType = identitySliderMap[answer.questionId];
    if (identityType) {
      identityTally[identityType] += answer.value;
    }
  }

  // ------------------------------------------------------------------
  // Step 3: Tally NS slider values (questions NS1-NS9)
  // ------------------------------------------------------------------
  const nsTally: Record<NervousSystemState, number> = {
    SYMP: 0,
    DORSAL: 0,
    VENTRAL: 0,
  };

  // Map NS slider question IDs to NS states
  const nsSliderMap: Record<string, NervousSystemState> = {
    NS1: 'SYMP',
    NS2: 'SYMP',
    NS3: 'SYMP',
    NS4: 'DORSAL',
    NS5: 'DORSAL',
    NS6: 'DORSAL',
    NS7: 'VENTRAL',
    NS8: 'VENTRAL',
    NS9: 'VENTRAL',
  };

  const nsSliderAnswers = answers.filter(
    (a): a is SliderAnswer => a.type === 'ns-slider'
  );

  for (const answer of nsSliderAnswers) {
    const nsState = nsSliderMap[answer.questionId];
    if (nsState) {
      nsTally[nsState] += answer.value;
    }
  }

  // ------------------------------------------------------------------
  // Step 4: Rank identities (max possible: 10 scenario + 5 slider = 15)
  // ------------------------------------------------------------------
  const identityResults = (Object.keys(identityTally) as IdentityType[])
    .map((type) => ({
      type,
      name: IDENTITY_DISPLAY_NAMES[type],
      score: identityTally[type],
      pct: Math.round((identityTally[type] / 15) * 100),
    }))
    .sort((a, b) => b.score - a.score);

  const primary = identityResults[0];
  const secondary = identityResults[1].score >= 6 ? identityResults[1] : null;

  // ------------------------------------------------------------------
  // Step 5: Rank NS states (max possible: 3 questions × 5 = 15 per state)
  // ------------------------------------------------------------------
  const nsResults = (Object.keys(nsTally) as NervousSystemState[])
    .map((state) => ({
      state,
      name: NS_DISPLAY_NAMES[state],
      short: NS_SHORT_NAMES[state],
      score: nsTally[state],
      pct: Math.round((nsTally[state] / 15) * 100),
    }))
    .sort((a, b) => b.score - a.score);

  const primaryNS = nsResults[0];

  // ------------------------------------------------------------------
  // Step 6: Determine combination key
  // If ventral is dominant, use the next highest NS state for the combination
  // ------------------------------------------------------------------
  const dominantNSState: NervousSystemState =
    primaryNS.state === 'VENTRAL' ? nsResults[1].state : primaryNS.state;

  const combinationKey = `${primary.type}_${dominantNSState}` as CombinationKey;

  return {
    identityResults,
    nsResults,
    primary,
    secondary,
    primaryNS,
    combinationKey,
    dominantNSState,
  };
}
