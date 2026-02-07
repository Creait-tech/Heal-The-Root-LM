import type {
  Answer,
  ScenarioAnswer,
  SliderAnswer,
  RegulationPattern,
  RegulationTally,
  CoreWound,
  SurvivalIdentity,
  ScoringResult,
} from './types';
import { questions } from './questions';

/**
 * Calculate the full scoring result from assessment answers.
 *
 * Scoring algorithm:
 * 1. Count scenario selections (A=fight-flight, B=freeze, C=fawn, D=no score)
 * 2. Add weighted slider contributions (scores 7+ add to pattern tallies)
 * 3. Determine primary pattern (highest tally)
 * 4. Check for blended types (tie or within 1 point)
 * 5. Determine core wounds based on slider scores + scenario patterns
 * 6. Map pattern + wound to survival identity
 */
export function calculateResults(answers: Answer[]): ScoringResult {
  const tally: RegulationTally = {
    'fight-flight': 0,
    freeze: 0,
    fawn: 0,
  };

  // ------------------------------------------------------------------
  // Step 1: Count scenario answer selections (questions 1-12)
  // ------------------------------------------------------------------
  const scenarioAnswers = answers.filter(
    (a): a is ScenarioAnswer => a.type === 'scenario'
  );

  for (const answer of scenarioAnswers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question || question.type !== 'scenario') continue;

    const selectedOption = question.options.find(
      (opt) => opt.label === answer.selectedOption
    );

    if (selectedOption?.regulationType) {
      tally[selectedOption.regulationType] += 1;
    }
    // Option D (open-ended) does not contribute to tally
  }

  // ------------------------------------------------------------------
  // Step 2: Add weighted contributions from slider questions (13-20)
  // Scores of 7+ contribute to the mapped regulation pattern
  // ------------------------------------------------------------------
  const sliderAnswers = answers.filter(
    (a): a is SliderAnswer => a.type === 'slider'
  );

  // Helper to get slider value by question ID
  const getSliderValue = (questionId: number): number => {
    const answer = sliderAnswers.find((a) => a.questionId === questionId);
    return answer?.value ?? 0;
  };

  // Q13: "I feel like I have to earn the right to rest" → fight-flight
  if (getSliderValue(13) >= 7) tally['fight-flight'] += 1;

  // Q14: "I struggle to ask for help" → fight-flight
  if (getSliderValue(14) >= 7) tally['fight-flight'] += 1;

  // Q15: "I often feel tired but can't explain why" → freeze
  if (getSliderValue(15) >= 7) tally.freeze += 1;

  // Q16: "Waiting for the other shoe to drop" → freeze + 0.5 fawn
  if (getSliderValue(16) >= 7) {
    tally.freeze += 0.5;
    tally.fawn += 0.5;
  }

  // Q17: "Easier to show up for others than myself" → fawn
  if (getSliderValue(17) >= 7) tally.fawn += 1;

  // Q18: "I don't know what I want but I know what everyone else needs" → fawn
  if (getSliderValue(18) >= 7) tally.fawn += 1;

  // Q19: "If I slow down everything will fall apart" → fight-flight
  if (getSliderValue(19) >= 7) tally['fight-flight'] += 1;

  // Q20: "Calm feels unfamiliar" → freeze
  if (getSliderValue(20) >= 7) tally.freeze += 1;

  // ------------------------------------------------------------------
  // Step 3: Determine primary (and secondary) regulation pattern
  // ------------------------------------------------------------------
  const sorted = (
    Object.entries(tally) as [RegulationPattern, number][]
  ).sort(([, a], [, b]) => b - a);

  const primaryPattern = sorted[0][0];
  const primaryScore = sorted[0][1];
  const secondaryPattern = sorted[1][0];
  const secondaryScore = sorted[1][1];

  // Blended if within 1 point and secondary > 0
  const isBlended = primaryScore - secondaryScore <= 1 && secondaryScore > 0;

  // ------------------------------------------------------------------
  // Step 4: Determine core wounds
  // ------------------------------------------------------------------
  const coreWounds: CoreWound[] = [];

  // Helper to get scenario answer option label
  const getScenarioOption = (questionId: number): string | undefined => {
    const answer = scenarioAnswers.find((a) => a.questionId === questionId);
    return answer?.selectedOption;
  };

  // Money/Scarcity: Q13+Q19 both 7+ AND primary is fight-flight
  if (
    getSliderValue(13) >= 7 &&
    getSliderValue(19) >= 7 &&
    primaryPattern === 'fight-flight'
  ) {
    coreWounds.push('money-scarcity');
  }

  // Abandonment: Q14+Q17 both 7+ AND/OR primary is fawn
  if (
    (getSliderValue(14) >= 7 && getSliderValue(17) >= 7) ||
    primaryPattern === 'fawn'
  ) {
    coreWounds.push('abandonment');
  }

  // Unworthiness: Q16 >= 7 AND scenario Q12 answer is B or C
  const q12Option = getScenarioOption(12);
  if (getSliderValue(16) >= 7 && (q12Option === 'B' || q12Option === 'C')) {
    coreWounds.push('unworthiness');
  }

  // Control: Q13+Q19 both 7+ AND scenario Q8 answer is A
  const q8Option = getScenarioOption(8);
  if (
    getSliderValue(13) >= 7 &&
    getSliderValue(19) >= 7 &&
    q8Option === 'A'
  ) {
    coreWounds.push('control');
  }

  // Exhaustion/Burnout: Q15 >= 7 AND scenario Q6 answer is B AND primary is freeze
  const q6Option = getScenarioOption(6);
  if (
    getSliderValue(15) >= 7 &&
    q6Option === 'B' &&
    primaryPattern === 'freeze'
  ) {
    coreWounds.push('exhaustion-burnout');
  }

  // If no wounds detected, assign a default based on pattern
  if (coreWounds.length === 0) {
    if (primaryPattern === 'fight-flight') coreWounds.push('control');
    else if (primaryPattern === 'freeze') coreWounds.push('exhaustion-burnout');
    else coreWounds.push('abandonment');
  }

  // Keep top 2 wounds
  const topWounds = coreWounds.slice(0, 2);

  // ------------------------------------------------------------------
  // Step 5: Map to survival identity
  // ------------------------------------------------------------------
  const survivalIdentity = determineSurvivalIdentity(
    primaryPattern,
    topWounds,
    scenarioAnswers,
    sliderAnswers,
    tally
  );

  // ------------------------------------------------------------------
  // Step 6: Fawn tendency detection (people-pleasing behavioral layer)
  // ------------------------------------------------------------------
  const fawnTendency = tally.fawn >= 3;
  const fawnTallyScore = tally.fawn;

  return {
    tally,
    primaryPattern,
    secondaryPattern: isBlended ? secondaryPattern : undefined,
    isBlended,
    coreWounds: topWounds,
    survivalIdentity,
    fawnTendency,
    fawnTallyScore,
  };
}

/**
 * Determine the survival identity based on regulation pattern + wounds + specific question answers.
 *
 * Each identity now has clear, traceable question triggers:
 *
 * 1. The Rage Holder — Fight/Flight ≥ 6 + Q9=A (loud in arguments) + Q5=A (fires back at family)
 * 2. The Survivor Who Can't Receive — Q12=B/C (can't receive) + Q20 ≥ 7 (calm unfamiliar) + Q14 ≥ 7 (can't ask for help)
 * 3. The Self-Saboteur — Freeze/Fawn + Q16 ≥ 7 (other shoe) + Q10=B/C (comparison shame) + unworthiness wound
 * 4. The Mask — Q5=C (laughs it off) + Q14 ≥ 7 + Q18 ≥ 7 + not rage-level fight-flight
 * 5. The Provider — Fight/Flight + Q3=A (fix-it mode money) + Q6=A (fills free time) + Q13 ≥ 7 or Q19 ≥ 7
 * 6. The Hyper-Independent — Fight/Flight + Q14 ≥ 7 (can't ask help) + Q7=A/B (pushes/pulls away)
 * 7. The Good One — Fawn + Q17 ≥ 7 (show up for others) + Q4=C (lets credit go) + Q9=C (apologizes first)
 * 8. The Functional Freeze — Freeze + Q15 ≥ 7 (tired) + Q8=B (thinks, never responds)
 */
function determineSurvivalIdentity(
  primaryPattern: RegulationPattern,
  wounds: CoreWound[],
  scenarioAnswers: ScenarioAnswer[],
  sliderAnswers: SliderAnswer[],
  tally: RegulationTally
): SurvivalIdentity {
  const getSlider = (id: number) =>
    sliderAnswers.find((a) => a.questionId === id)?.value ?? 0;
  const getScenario = (id: number) =>
    scenarioAnswers.find((a) => a.questionId === id)?.selectedOption;

  // ---- 1. The Rage Holder ----
  // Explosive fight-flight: high tally + gets loud in arguments + fires back at family
  if (
    primaryPattern === 'fight-flight' &&
    tally['fight-flight'] >= 6 &&
    getScenario(9) === 'A' && // Gets loud, needs to be heard RIGHT NOW
    getScenario(5) === 'A'    // Fires back, sets the record straight
  ) {
    return 'the-rage-holder';
  }

  // ---- 2. The Survivor Who Can't Receive ----
  // Can't receive compliments + calm feels unfamiliar + can't ask for help
  const q12 = getScenario(12);
  if (
    getSlider(20) >= 7 &&                    // Calm/peace feels unfamiliar
    (q12 === 'B' || q12 === 'C') &&          // Can't receive compliments
    getSlider(14) >= 7                        // Struggles to ask for help
  ) {
    return 'the-survivor-who-cant-receive';
  }

  // ---- 3. The Self-Saboteur ----
  // Freeze/fawn + waiting for other shoe + comparison triggers shame + unworthiness
  const q10 = getScenario(10);
  if (
    wounds.includes('unworthiness') &&
    (primaryPattern === 'freeze' || primaryPattern === 'fawn') &&
    getSlider(16) >= 7 &&                    // Waiting for other shoe to drop
    (q10 === 'B' || q10 === 'C')             // Social comparison → shame/shutdown
  ) {
    return 'the-self-saboteur';
  }

  // ---- 4. The Mask ----
  // Social masking + can't identify own needs + can't ask for help (not rage-level)
  if (
    getSlider(18) >= 7 &&                    // Don't know what I want
    getSlider(14) >= 7 &&                    // Struggle to ask for help
    getScenario(5) === 'C' &&                // Laughs it off, changes subject (masking)
    tally['fight-flight'] < 6                // Not rage-holder territory
  ) {
    return 'the-mask';
  }

  // ---- 5. The Provider ----
  // Fight-flight + fix-it mode with money + fills free time + earns rest / fears stopping
  if (
    primaryPattern === 'fight-flight' &&
    (getSlider(13) >= 7 || getSlider(19) >= 7) && // Earn rest OR slowing down = collapse
    getScenario(3) === 'A' &&                      // Fix-it mode with money
    getScenario(6) === 'A'                         // Fills free weekend immediately
  ) {
    return 'the-provider';
  }

  // ---- 6. The Hyper-Independent ----
  // Fight-flight + can't ask for help + pushes or pulls away when someone is upset
  const q7 = getScenario(7);
  if (
    primaryPattern === 'fight-flight' &&
    getSlider(14) >= 7 &&                    // Struggles to ask for help
    (q7 === 'A' || q7 === 'B')              // Pushes until they talk OR pulls away
  ) {
    return 'the-hyper-independent';
  }

  // ---- 7. The Good One ----
  // Fawn + shows up for others + lets credit be taken + apologizes first
  if (
    primaryPattern === 'fawn' &&
    getSlider(17) >= 7 &&                    // Easier to show up for others
    getScenario(4) === 'C' &&                // Says nothing when credit is taken
    getScenario(9) === 'C'                   // Apologizes first even when not wrong
  ) {
    return 'the-good-one';
  }

  // ---- 8. The Functional Freeze ----
  // Freeze + unexplained tiredness + paralysis with opportunities
  if (
    primaryPattern === 'freeze' &&
    getSlider(15) >= 7 &&                    // Tired but can't explain why
    getScenario(8) === 'B'                   // Thinks about it, never responds
  ) {
    return 'the-functional-freeze';
  }

  // ---- 9. Fallbacks (pattern-based) ----
  // These catch cases where specific question combos don't match but pattern is clear
  if (primaryPattern === 'fight-flight') return 'the-hyper-independent';
  if (primaryPattern === 'freeze') return 'the-functional-freeze';
  return 'the-good-one'; // fawn fallback
}
