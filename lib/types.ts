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

// --- New Identity System Types ---

/** The 5 Survival Identity Types */
export type IdentityType = 'ACHIEVER' | 'ANCHOR' | 'OPERATOR' | 'STRATEGIST' | 'BURNER';

/** The 3 Nervous System States (Polyvagal) */
export type NervousSystemState = 'SYMP' | 'DORSAL' | 'VENTRAL';

/** Combination key: identity + dominant NS state (excluding ventral for combo) */
export type CombinationKey =
  | 'ACHIEVER_SYMP' | 'ACHIEVER_DORSAL'
  | 'ANCHOR_SYMP' | 'ANCHOR_DORSAL'
  | 'OPERATOR_SYMP' | 'OPERATOR_DORSAL'
  | 'STRATEGIST_SYMP' | 'STRATEGIST_DORSAL'
  | 'BURNER_SYMP' | 'BURNER_DORSAL';

// --- Assessment Question Types ---
export type QuestionType = 'scenario' | 'identity-slider' | 'ns-slider';

export interface ScenarioOption {
  text: string;
  maps: IdentityType;
}

export interface ScenarioQuestion {
  id: string;
  type: 'scenario';
  prompt: string;
  options: ScenarioOption[];
}

export interface IdentitySliderQuestion {
  id: string;
  type: 'identity-slider';
  statement: string;
  maps: IdentityType;
}

export interface NSSliderQuestion {
  id: string;
  type: 'ns-slider';
  statement: string;
  maps: NervousSystemState;
}

export type Question = ScenarioQuestion | IdentitySliderQuestion | NSSliderQuestion;

// --- Answer Types ---
export interface ScenarioAnswer {
  questionId: string;
  type: 'scenario';
  selectedIdentity: IdentityType;
}

export interface SliderAnswer {
  questionId: string;
  type: 'identity-slider' | 'ns-slider';
  value: number; // 0-5
}

export type Answer = ScenarioAnswer | SliderAnswer;

// --- Scoring / Results Types ---

export interface IdentityResult {
  type: IdentityType;
  name: string;
  score: number;
  pct: number;
}

export interface NSResult {
  state: NervousSystemState;
  name: string;
  short: string;
  score: number;
  pct: number;
}

export interface ScoringResult {
  identityResults: IdentityResult[];
  nsResults: NSResult[];
  primary: IdentityResult;
  secondary: IdentityResult | null;
  primaryNS: NSResult;
  combinationKey: CombinationKey;
  dominantNSState: NervousSystemState; // The NS state used for combination (non-ventral)
}

// --- Slider Labels ---
export const SLIDER_LABELS: Record<number, string> = {
  0: 'Not me at all',
  1: 'Slightly me',
  2: 'Sometimes me',
  3: 'Often me',
  4: 'Mostly me',
  5: 'Me all the time',
};

// --- Display Names ---
export const IDENTITY_DISPLAY_NAMES: Record<IdentityType, string> = {
  ACHIEVER: 'The Over-Responsible Achiever',
  ANCHOR: 'The Emotional Anchor',
  OPERATOR: 'The Self-Sufficient Operator',
  STRATEGIST: 'The Controlled Strategist',
  BURNER: 'The Hidden Burner',
};

export const NS_DISPLAY_NAMES: Record<NervousSystemState, string> = {
  SYMP: 'Sympathetic Mobilization',
  DORSAL: 'Dorsal Shutdown',
  VENTRAL: 'Ventral Regulation',
};

export const NS_SHORT_NAMES: Record<NervousSystemState, string> = {
  SYMP: 'Fight / Flight',
  DORSAL: 'Freeze / Shutdown',
  VENTRAL: 'Safe / Connected',
};

export const IDENTITY_EMOJI: Record<IdentityType, string> = {
  ACHIEVER: '✶',
  ANCHOR: '♥',
  OPERATOR: '◇',
  STRATEGIST: '◎',
  BURNER: '⚡',
};

export const NS_EMOJI: Record<NervousSystemState, string> = {
  SYMP: '✶',
  DORSAL: '❄',
  VENTRAL: '❀',
};

// --- User / Session Types ---
export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string; // YYYY-MM-DD
  phone?: string;
}

export interface AppState {
  completedParts: number[];
  currentQuestionIndex: number;
  answers: Answer[];
  userInfo: UserInfo | null;
  scoringResult: ScoringResult | null;
  assessmentStartedAt: string | null;
  assessmentCompletedAt: string | null;
  sessionId: string | null;
  quizResultId: string | null;
}
