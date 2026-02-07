// --- Educational Module Types ---
export interface EducationalPart {
  id: 1 | 2 | 3;
  title: string;
  subtitle: string;
  content: ContentSection[];
  estimatedMinutes: number;
}

export interface ContentSection {
  type: 'paragraph' | 'heading' | 'quote' | 'list' | 'video-placeholder';
  content: string;
  items?: string[]; // for list type
}

// --- Assessment Question Types ---
export type QuestionType = 'scenario' | 'slider' | 'open-ended';

export interface ScenarioOption {
  label: string; // "A", "B", "C", "D"
  text: string;
  regulationType?: RegulationPattern; // D has no type (open-ended)
}

export interface ScenarioQuestion {
  id: number;
  type: 'scenario';
  scenario: string; // The scenario description
  prompt: string; // "I'm the type of person who..."
  options: ScenarioOption[];
}

export interface SliderQuestion {
  id: number;
  type: 'slider';
  prompt: string;
  minLabel: string;
  maxLabel: string;
  scoringMap: {
    type: RegulationPattern;
    threshold: number; // score at or above which it contributes
  };
}

export interface OpenEndedQuestion {
  id: number;
  type: 'open-ended';
  prompt: string;
  placeholder?: string;
}

export type Question = ScenarioQuestion | SliderQuestion | OpenEndedQuestion;

// --- Answer Types ---
export interface ScenarioAnswer {
  questionId: number;
  type: 'scenario';
  selectedOption: string; // "A" | "B" | "C" | "D"
  openEndedText?: string; // If "D" selected
}

export interface SliderAnswer {
  questionId: number;
  type: 'slider';
  value: number; // 1-10
}

export interface OpenEndedAnswer {
  questionId: number;
  type: 'open-ended';
  text: string;
}

export type Answer = ScenarioAnswer | SliderAnswer | OpenEndedAnswer;

// --- Scoring / Results Types ---
export type RegulationPattern = 'fight-flight' | 'freeze' | 'fawn';

export type CoreWound = 'money-scarcity' | 'abandonment' | 'unworthiness' | 'control' | 'exhaustion-burnout';

export type SurvivalIdentity =
  | 'the-provider'
  | 'the-hyper-independent'
  | 'the-functional-freeze'
  | 'the-self-saboteur'
  | 'the-mask'
  | 'the-rage-holder'
  | 'the-good-one'
  | 'the-survivor-who-cant-receive';

export interface RegulationTally {
  'fight-flight': number;
  freeze: number;
  fawn: number;
}

export interface ScoringResult {
  tally: RegulationTally;
  primaryPattern: RegulationPattern;
  secondaryPattern?: RegulationPattern;
  isBlended: boolean;
  coreWounds: CoreWound[];
  survivalIdentity: SurvivalIdentity;
  fawnTendency: boolean;      // true if fawn tally >= 3 (people-pleasing detected)
  fawnTallyScore: number;     // raw fawn score for descriptive text
}

// --- User / Session Types ---
export interface UserInfo {
  firstName: string;
  email: string;
  phone: string;
}

export interface AppState {
  completedParts: number[];
  currentQuestionIndex: number;
  answers: Answer[];
  userInfo: UserInfo | null;
  scoringResult: ScoringResult | null;
  assessmentStartedAt: string | null;
  assessmentCompletedAt: string | null;
}
