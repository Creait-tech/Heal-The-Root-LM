import type { Question } from './types';

export const questions: Question[] = [
  // ============================================================
  // QUESTIONS 1-12: SCENARIO-BASED
  // ============================================================

  // Question 1
  {
    id: 1,
    type: 'scenario',
    scenario: 'Someone cuts you off in traffic.',
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: 'Lays on the horn, speeds up, or says something sharp out loud',
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: 'Goes quiet, grips the wheel, zones out for the next few miles',
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: 'Immediately assumes I must have been in their blind spot \u2014 probably my fault',
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 2
  {
    id: 2,
    type: 'scenario',
    scenario: 'Your partner or close friend cancels plans last minute.',
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: "Gets irritated fast \u2014 'Why do I even make plans?'",
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: "Says 'it's fine' and scrolls my phone for the next two hours feeling nothing",
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: "Texts back 'no worries!' and then spends the night wondering what I did wrong",
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 3
  {
    id: 3,
    type: 'scenario',
    scenario: "You check your bank account and it's lower than expected.",
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: 'Immediately goes into fix-it mode \u2014 moving money, cutting expenses, grinding harder',
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: 'Closes the app. Opens Netflix. Deals with it later... maybe',
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: 'Feels guilty \u2014 like I should have been more responsible, more careful, more disciplined',
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 4
  {
    id: 4,
    type: 'scenario',
    scenario: 'Someone at work takes credit for your idea.',
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: 'Calls it out \u2014 either directly to them or to someone who can fix it',
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: 'Lets it go. Stops contributing as much. Quietly checks out',
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: "Says nothing but tells myself it's fine \u2014 maybe they need the win more than I do",
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 5
  {
    id: 5,
    type: 'scenario',
    scenario: "You're at a family gathering and someone makes a comment about your life choices.",
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: 'Fires back \u2014 defends myself, sets the record straight, maybe a little too hard',
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: 'Smiles, nods, goes emotionally blank until I can leave',
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: 'Laughs it off and changes the subject to something about them',
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 6
  {
    id: 6,
    type: 'scenario',
    scenario: 'You finally have a free weekend with nothing to do.',
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: 'Fills it immediately \u2014 errands, projects, workouts. Stillness feels wrong',
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: "Sleeps, scrolls, watches the same shows. I want to do things but I can't start",
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: "Asks everyone else what they need first. My free time doesn't feel like mine",
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 7
  {
    id: 7,
    type: 'scenario',
    scenario: "Someone you care about is clearly upset with you but won't say why.",
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: "Pushes until they talk \u2014 I can't sit with the unknown",
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: "Pulls away. If they want space, fine. I'll be fine too. I'm always fine",
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: 'Replays every interaction in my head trying to figure out what I did wrong',
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 8
  {
    id: 8,
    type: 'scenario',
    scenario: "You're offered a major opportunity \u2014 promotion, new venture, big move.",
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: 'Says yes fast, figures it out later. Motion is safety',
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: 'Thinks about it... and thinks about it... and never responds',
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: "Asks everyone else's opinion first. What if it disrupts the people who depend on me?",
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 9
  {
    id: 9,
    type: 'scenario',
    scenario: "You're in an argument with someone you love.",
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: 'Gets loud, gets intense, needs to be heard RIGHT NOW',
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: "Shuts down mid-conversation. I can't find my words even though they're screaming inside",
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: "Apologizes first \u2014 even if I know I wasn't wrong \u2014 just to make it stop",
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 10
  {
    id: 10,
    type: 'scenario',
    scenario: 'You see someone on social media living the life you want.',
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: "Feels a fire \u2014 'I need to work harder, do more, figure this out NOW'",
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: "Feels heavy. Closes the app. Wonders why I can't seem to want things the way other people do",
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: "Feels happy for them... then quietly ashamed that I'm not there yet",
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 11
  {
    id: 11,
    type: 'scenario',
    scenario: 'You wake up at 3am with racing thoughts.',
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: 'Grabs my phone and starts problem-solving or making lists',
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: "Stares at the ceiling. Can't think clearly but can't sleep either",
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: 'Worries about other people \u2014 did I say the wrong thing, am I failing someone?',
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // Question 12
  {
    id: 12,
    type: 'scenario',
    scenario: 'Someone genuinely compliments you.',
    prompt: "I'm the type of person who...",
    options: [
      {
        label: 'A',
        text: 'Deflects with humor or immediately redirects the conversation',
        regulationType: 'fight-flight',
      },
      {
        label: 'B',
        text: "Feels almost nothing. Like the words don't land",
        regulationType: 'freeze',
      },
      {
        label: 'C',
        text: "Downplays it \u2014 'Oh, it was nothing' \u2014 because receiving feels uncomfortable",
        regulationType: 'fawn',
      },
      {
        label: 'D',
        text: 'Something else:',
      },
    ],
  },

  // ============================================================
  // QUESTIONS 13-20: SLIDER-BASED
  // ============================================================

  // Question 13
  {
    id: 13,
    type: 'slider',
    prompt: 'I feel like I have to earn the right to rest.',
    minLabel: 'Never',
    maxLabel: 'Always',
    scoringMap: {
      type: 'fight-flight',
      threshold: 7,
    },
  },

  // Question 14
  {
    id: 14,
    type: 'slider',
    prompt: 'I struggle to ask for help \u2014 even when I clearly need it.',
    minLabel: 'Never',
    maxLabel: 'Always',
    scoringMap: {
      type: 'fight-flight',
      threshold: 7,
    },
  },

  // Question 15
  {
    id: 15,
    type: 'slider',
    prompt: "I often feel tired but can't explain why, even after sleeping.",
    minLabel: 'Never',
    maxLabel: 'Always',
    scoringMap: {
      type: 'freeze',
      threshold: 7,
    },
  },

  // Question 16
  {
    id: 16,
    type: 'slider',
    prompt: 'When things are going well, I find myself waiting for the other shoe to drop.',
    minLabel: 'Never',
    maxLabel: 'Always',
    scoringMap: {
      type: 'freeze',
      threshold: 7,
    },
  },

  // Question 17
  {
    id: 17,
    type: 'slider',
    prompt: 'I find it easier to show up for others than to show up for myself.',
    minLabel: 'Never',
    maxLabel: 'Always',
    scoringMap: {
      type: 'fawn',
      threshold: 7,
    },
  },

  // Question 18
  {
    id: 18,
    type: 'slider',
    prompt: "I don't always know what I want \u2014 but I know what everyone else needs.",
    minLabel: 'Never',
    maxLabel: 'Always',
    scoringMap: {
      type: 'fawn',
      threshold: 7,
    },
  },

  // Question 19
  {
    id: 19,
    type: 'slider',
    prompt: "I feel like if I slow down, everything I've built will fall apart.",
    minLabel: 'Never',
    maxLabel: 'Always',
    scoringMap: {
      type: 'fight-flight',
      threshold: 7,
    },
  },

  // Question 20
  {
    id: 20,
    type: 'slider',
    prompt: 'Calm or peace feels unfamiliar \u2014 sometimes even uncomfortable.',
    minLabel: 'Never',
    maxLabel: 'Always',
    scoringMap: {
      type: 'freeze',
      threshold: 7,
    },
  },

  // ============================================================
  // QUESTIONS 21-24: OPEN-ENDED
  // ============================================================

  // Question 21
  {
    id: 21,
    type: 'open-ended',
    prompt: 'When you think about the version of yourself you had to become to survive \u2014 what comes to mind?',
    placeholder: "There's no right answer. Just write what comes up.",
  },

  // Question 22
  {
    id: 22,
    type: 'open-ended',
    prompt: "What's one thing you know you deserve but have a hard time actually receiving?",
    placeholder: 'Be honest with yourself here.',
  },

  // Question 23
  {
    id: 23,
    type: 'open-ended',
    prompt: 'If your body could talk, what would it say it needs right now?',
    placeholder: 'Listen to what comes up, even if it surprises you.',
  },

  // Question 24
  {
    id: 24,
    type: 'open-ended',
    prompt: 'What would change in your life if your nervous system finally felt safe?',
    placeholder: 'Dream without limits for a moment.',
  },
];

export const TOTAL_QUESTIONS = questions.length;
