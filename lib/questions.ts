import type { Question } from './types';

// ============================================================
// THE SURVIVAL IDENTITY TEST — 24 Questions
// Part 1: 10 Scenario Questions (pick one)
// Part 2: 5 Identity Intensity Sliders (0-5)
// Part 3: 9 Nervous System Sliders (0-5)
// ============================================================

export const questions: Question[] = [
  // ============================================================
  // PART 1: SCENARIO-BASED (10 questions, 5 options each)
  // Each option maps to one of 5 identity types
  // ============================================================

  {
    id: 'S1',
    type: 'scenario',
    prompt: "When I'm driving and someone is moving too slowly in front of me, I'm the type of person who...",
    options: [
      { text: 'Analyzes whether it\'s worth switching lanes and calculates the most efficient move.', maps: 'STRATEGIST' },
      { text: 'Gets tense but tries to stay composed and avoid escalating anything.', maps: 'ANCHOR' },
      { text: 'Feels irritated but pulls back and disengages instead of reacting.', maps: 'OPERATOR' },
      { text: 'Suddenly loses energy and stops caring about getting there quickly.', maps: 'BURNER' },
      { text: "Immediately finds a way around them because I don't like losing momentum.", maps: 'ACHIEVER' },
    ],
  },

  {
    id: 'S2',
    type: 'scenario',
    prompt: "When I wake up to a stressful or critical email, I'm the type of person who...",
    options: [
      { text: 'Focuses on softening my response so no one feels upset.', maps: 'ANCHOR' },
      { text: 'Feels drained and has a hard time getting started afterward.', maps: 'BURNER' },
      { text: 'Immediately jumps into fixing it before even starting my day.', maps: 'ACHIEVER' },
      { text: 'Rereads it multiple times to fully understand the implications.', maps: 'STRATEGIST' },
      { text: 'Avoids responding until I feel less irritated or pressured.', maps: 'OPERATOR' },
    ],
  },

  {
    id: 'S3',
    type: 'scenario',
    prompt: "When plans change unexpectedly, I'm the type of person who...",
    options: [
      { text: 'Withdraws and decides to handle it alone.', maps: 'OPERATOR' },
      { text: 'Quickly reorganizes everything so it still works.', maps: 'ACHIEVER' },
      { text: 'Feels overwhelmed and momentarily shuts down.', maps: 'BURNER' },
      { text: 'Worries about how the change affects everyone else.', maps: 'ANCHOR' },
      { text: 'Feels unsettled and needs to mentally re-map the situation.', maps: 'STRATEGIST' },
    ],
  },

  {
    id: 'S4',
    type: 'scenario',
    prompt: "When I check my bank account after a large expense, I'm the type of person who...",
    options: [
      { text: 'Feels heavy and avoids thinking about it altogether.', maps: 'BURNER' },
      { text: 'Runs numbers and scenarios in my head to regain control.', maps: 'STRATEGIST' },
      { text: 'Worries about how it impacts people depending on me.', maps: 'ANCHOR' },
      { text: 'Immediately looks for ways to increase income.', maps: 'ACHIEVER' },
      { text: "Tells myself I'll figure it out and pushes the stress aside.", maps: 'OPERATOR' },
    ],
  },

  {
    id: 'S5',
    type: 'scenario',
    prompt: "When someone close to me is struggling and looks to me for help, I'm the type of person who...",
    options: [
      { text: 'Steps up automatically and takes responsibility.', maps: 'ACHIEVER' },
      { text: 'Handles it practically but avoids getting emotionally involved.', maps: 'OPERATOR' },
      { text: 'Assesses what\'s necessary and sets structured boundaries.', maps: 'STRATEGIST' },
      { text: 'Feels internally overwhelmed but still shows up.', maps: 'BURNER' },
      { text: 'Absorbs their emotions and tries to stabilize them.', maps: 'ANCHOR' },
    ],
  },

  {
    id: 'S6',
    type: 'scenario',
    prompt: "When I experience a win or success, I'm the type of person who...",
    options: [
      { text: 'Downplays it and keeps moving.', maps: 'OPERATOR' },
      { text: 'Feels good briefly, then suddenly exhausted.', maps: 'BURNER' },
      { text: 'Thinks about how to maintain it strategically.', maps: 'STRATEGIST' },
      { text: 'Immediately sets the next goal.', maps: 'ACHIEVER' },
      { text: 'Makes sure others feel included in the success.', maps: 'ANCHOR' },
    ],
  },

  {
    id: 'S7',
    type: 'scenario',
    prompt: "When I have an entire weekend with nothing scheduled, I'm the type of person who...",
    options: [
      { text: 'Scrolls, naps, or zones out more than intended.', maps: 'BURNER' },
      { text: 'Checks in with everyone to see what they need.', maps: 'ANCHOR' },
      { text: 'Finds projects or tasks to stay productive.', maps: 'ACHIEVER' },
      { text: 'Keeps to myself and limits interaction.', maps: 'OPERATOR' },
      { text: 'Plans how to use the time efficiently.', maps: 'STRATEGIST' },
    ],
  },

  {
    id: 'S8',
    type: 'scenario',
    prompt: "When someone confronts me about something I did, I'm the type of person who...",
    options: [
      { text: 'Defends my actions with logic and results.', maps: 'ACHIEVER' },
      { text: 'Replays the conversation later analyzing every detail.', maps: 'STRATEGIST' },
      { text: 'Pulls back emotionally and minimizes the issue.', maps: 'OPERATOR' },
      { text: 'Focuses on repairing the relationship quickly.', maps: 'ANCHOR' },
      { text: 'Feels flooded and shuts down internally.', maps: 'BURNER' },
    ],
  },

  {
    id: 'S9',
    type: 'scenario',
    prompt: "When I'm in a leadership role and something goes wrong, I'm the type of person who...",
    options: [
      { text: 'Creates a tighter system to prevent it happening again.', maps: 'STRATEGIST' },
      { text: 'Fixes it quietly without asking for help.', maps: 'OPERATOR' },
      { text: 'Makes sure everyone feels okay first.', maps: 'ANCHOR' },
      { text: "Feels like I'm failing but hides it.", maps: 'BURNER' },
      { text: 'Takes over and ensures it gets handled.', maps: 'ACHIEVER' },
    ],
  },

  {
    id: 'S10',
    type: 'scenario',
    prompt: "When I make a noticeable mistake, I'm the type of person who...",
    options: [
      { text: 'Worries I disappointed someone.', maps: 'ANCHOR' },
      { text: "Works harder to prove it won't happen again.", maps: 'ACHIEVER' },
      { text: 'Feels deflated and questions myself internally.', maps: 'BURNER' },
      { text: 'Overanalyzes what went wrong.', maps: 'STRATEGIST' },
      { text: 'Withdraws and keeps it to myself.', maps: 'OPERATOR' },
    ],
  },

  // ============================================================
  // PART 2: IDENTITY INTENSITY SLIDERS (5 questions, 0-5 scale)
  // Each maps to one identity type
  // ============================================================

  {
    id: 'IS1',
    type: 'identity-slider',
    statement: 'I feel most secure when I\'m producing, solving, or moving something forward.',
    maps: 'ACHIEVER',
  },

  {
    id: 'IS2',
    type: 'identity-slider',
    statement: 'I often feel responsible for maintaining emotional stability around me.',
    maps: 'ANCHOR',
  },

  {
    id: 'IS3',
    type: 'identity-slider',
    statement: 'I trust myself more than I trust support from others.',
    maps: 'OPERATOR',
  },

  {
    id: 'IS4',
    type: 'identity-slider',
    statement: "I feel safer when I've mapped out all possible outcomes.",
    maps: 'STRATEGIST',
  },

  {
    id: 'IS5',
    type: 'identity-slider',
    statement: 'I tend to oscillate between intense effort and total exhaustion.',
    maps: 'BURNER',
  },

  // ============================================================
  // PART 3: NERVOUS SYSTEM SLIDERS (9 questions, 0-5 scale)
  // 3 Sympathetic, 3 Dorsal, 3 Ventral
  // ============================================================

  // Sympathetic (Fight / Flight)
  {
    id: 'NS1',
    type: 'ns-slider',
    statement: 'When something unexpected happens, my body reacts fast — my chest tightens, my heart speeds up, or I feel a rush of urgency.',
    maps: 'SYMP',
  },

  {
    id: 'NS2',
    type: 'ns-slider',
    statement: 'After a stressful interaction, my mind replays it and my body stays on edge until it feels resolved.',
    maps: 'SYMP',
  },

  {
    id: 'NS3',
    type: 'ns-slider',
    statement: "Even when nothing urgent is happening, I feel like I should be doing something — fully relaxing feels uncomfortable.",
    maps: 'SYMP',
  },

  // Dorsal (Freeze / Shutdown)
  {
    id: 'NS4',
    type: 'ns-slider',
    statement: 'When stress builds up, I feel drained, foggy, or like I want to mentally check out or disappear.',
    maps: 'DORSAL',
  },

  {
    id: 'NS5',
    type: 'ns-slider',
    statement: "When too much is happening at once, I avoid starting, feel stuck, or suddenly lose motivation even if I care.",
    maps: 'DORSAL',
  },

  {
    id: 'NS6',
    type: 'ns-slider',
    statement: 'When I feel emotionally hurt or overwhelmed, I pull inward instead of reaching out.',
    maps: 'DORSAL',
  },

  // Ventral (Safe / Connected)
  {
    id: 'NS7',
    type: 'ns-slider',
    statement: 'Even when I get triggered, I can usually ground myself and return to a steady state within a reasonable amount of time.',
    maps: 'VENTRAL',
  },

  {
    id: 'NS8',
    type: 'ns-slider',
    statement: "In difficult conversations, I can stay present in my body instead of shutting down or getting overwhelmed.",
    maps: 'VENTRAL',
  },

  {
    id: 'NS9',
    type: 'ns-slider',
    statement: "When plans change unexpectedly, I can adapt without it ruining my entire mood or productivity.",
    maps: 'VENTRAL',
  },
];

export const TOTAL_QUESTIONS = questions.length; // 24
