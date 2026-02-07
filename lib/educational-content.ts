// Educational Priming Content for "Heal The Cycle: The Identity Your Nervous System Is Protecting"
// by Ase Reiki & Hypnotherapy
//
// Brand Voice: "Big Sister Who Made It Out -- and Refuses to Let You Suffer Unnecessarily."

export interface ContentSection {
  type:
    | "paragraph"
    | "heading"
    | "subheading"
    | "quote"
    | "list"
    | "video-placeholder"
    | "emphasis";
  content: string;
  items?: string[];
}

export interface EducationalPart {
  id: 1 | 2 | 3;
  title: string;
  subtitle: string;
  sections: ContentSection[];
  estimatedMinutes: number;
}

export const educationalParts: EducationalPart[] = [
  // ─────────────────────────────────────────────────────────────
  // PART 1: "Why You're Stuck"
  // ─────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Why You're Stuck",
    subtitle: "Part 1 of 3 — Understanding the Pattern",
    estimatedMinutes: 8,
    sections: [
      {
        type: "video-placeholder",
        content: "Video: Why You're Stuck (Coming Soon)",
      },
      {
        type: "heading",
        content: "Why You're Stuck",
      },
      {
        type: "paragraph",
        content:
          "Let's skip the part where I pretend I don't know why you're here. You've done the work. You've sat in therapy. You've read the books, listened to the podcasts, journaled until your hand cramped. You've tried affirmations, mindset shifts, vision boards, and maybe even a meditation app you opened twice. And yet — here you are. Still repeating the same patterns. Still choosing the same kinds of relationships. Still hitting the same wall at the same point. Still wondering what's wrong with you.",
      },
      {
        type: "list",
        content: "See if any of this sounds familiar:",
        items: [
          "You've done the therapy. Read the books. Tried the mindset work. And you're STILL repeating the same patterns.",
          "You understand your triggers intellectually but your body still reacts like nothing has changed.",
          "You're not afraid of hard work — you're afraid that nothing will actually change.",
          "You're tired in a way that rest doesn't fix.",
          "You're stuck — not because you haven't tried, but because something underneath keeps pulling you back.",
        ],
      },
      {
        type: "paragraph",
        content:
          "If you recognized yourself in even one of those, I need you to hear this clearly: none of this is your fault. You are not failing at healing. The methods you were given were incomplete. They addressed your mind but ignored the system that actually runs your behavior. Your nervous system has been doing exactly what it was designed to do — protect you. The gap isn't in your effort. It's in the approach.",
      },
      {
        type: "quote",
        content:
          "You didn't fail healing. Healing failed to account for how your nervous system, identity, and energy actually work together.",
      },
      {
        type: "heading",
        content: "The Real Reason",
      },
      {
        type: "paragraph",
        content:
          "Here's what nobody told you. The reason you keep cycling back to the same patterns has nothing to do with how smart you are, how hard you try, or whether you 'want it enough.' It has everything to do with a system running underneath your conscious awareness — one that was installed before you had any say in the matter.",
      },
      {
        type: "quote",
        content:
          "You are stuck because your nervous system is protecting an identity you no longer want.",
      },
      {
        type: "paragraph",
        content:
          "Your nervous system learned a survival identity early. Through childhood, scarcity, instability, emotional neglect, or trauma — it built a version of you designed to keep you alive. Maybe that identity was the peacekeeper. The overachiever. The one who never needs anything. The one who stays small so nobody feels threatened. Whatever it was, your system built it for a reason. And now? It protects that identity like it's still keeping you safe. Even when that identity is the very thing holding you back. Even when you consciously want something completely different. Your system doesn't care what you want. It cares what it knows.",
      },
      {
        type: "paragraph",
        content:
          "This isn't about willpower. It's not about wanting it enough. It's not about manifesting harder or thinking more positively. It's about biology. Plain and simple.",
      },
      {
        type: "emphasis",
        content:
          "Your nervous system runs the show. And until you understand how — nothing changes long-term.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PART 2: "What's Actually Happening Inside You"
  // ─────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "What's Actually Happening Inside You",
    subtitle: "Part 2 of 3 — The Science Made Simple",
    estimatedMinutes: 10,
    sections: [
      {
        type: "video-placeholder",
        content:
          "Video: What's Actually Happening Inside You (Coming Soon)",
      },
      {
        type: "heading",
        content: "What's Actually Happening Inside You",
      },
      {
        type: "paragraph",
        content:
          "Before we can change a pattern, we need to see it clearly. Not the story you tell yourself about the pattern — the actual mechanics running underneath it. There are three systems running your life right now, and most people have never had them explained in plain language. Let's fix that.",
      },
      {
        type: "subheading",
        content: "Your Nervous System",
      },
      {
        type: "paragraph",
        content:
          "This is the biological system that decides — every single second — whether you are safe or in danger. It runs 24/7 without your permission. You don't get to opt out. You don't get to override it with a good attitude. It was shaped by everything you survived. And I want you to catch that distinction: not everything you remember. Everything you survived. Your body kept score on things your conscious mind never even registered.",
      },
      {
        type: "subheading",
        content: "Your Identity",
      },
      {
        type: "paragraph",
        content:
          "Not who you chose to be. Not who you wish you were. The version of you that your nervous system built to survive whatever environment you grew up in. This is not your personality — it's your programming. The difference matters. Your personality is who you are when you feel safe. Your programming is who you become when your system detects threat. Most people have been running on programming so long they think it IS their personality. It's not.",
      },
      {
        type: "subheading",
        content: "Your Programming",
      },
      {
        type: "paragraph",
        content:
          "Repeated childhood experiences that wired your identity and nervous system together into one automated loop. Nobody chose this consciously. No one sat you down and said, 'Here's how you'll react to conflict for the rest of your life.' It happened to you before you had language to name it, before you had the capacity to choose differently, and before anyone explained that it was happening at all.",
      },
      {
        type: "heading",
        content: "The Three Nervous System States",
      },
      {
        type: "paragraph",
        content:
          "According to Polyvagal Theory — developed by neuroscientist Dr. Stephen Porges — your autonomic nervous system cycles through three primary states. These aren't personality traits or emotional choices. They're biological states your body moves through automatically based on its assessment of safety. Everyone experiences all three. The question is: which one does your system default to most often? That default was shaped by your earliest environments and experiences.",
      },
      {
        type: "subheading",
        content: "Ventral Vagal — Social Engagement and Safety",
      },
      {
        type: "paragraph",
        content:
          "The ventral vagal state is governed by the newest branch of the vagus nerve. In this state, your heart rate is regulated, your facial muscles are expressive, your voice has natural prosody, and your body feels calm enough to connect. You can think clearly, make considered decisions, and stay present during difficult conversations. This is the state where learning, bonding, creativity, and genuine rest happen. Most people can access this state in moments — a good conversation, a safe embrace, a quiet morning. The challenge is that many nervous systems were never given consistent enough safety to learn how to sustain it. That's not a character flaw. It's a reflection of what the body had access to early on.",
      },
      {
        type: "subheading",
        content: "Sympathetic — Mobilization",
      },
      {
        type: "paragraph",
        content:
          "The sympathetic nervous system is your body's mobilization system. It activates when your system detects a need for action — whether that's pursuing a goal, meeting a deadline, or responding to a genuine threat. Heart rate increases, muscles tense, adrenaline and cortisol release. In healthy doses, this state fuels productivity, exercise, passion, and protective instincts. It's not inherently negative — you need sympathetic activation to get things done, to stand up for yourself, to move through your day with energy. Where it becomes a problem is when the system gets stuck here. When mobilization becomes the default — when your body is always bracing, always scanning, always in go-mode — it starts wearing down the body. You might look productive and competent on the outside, but internally your system is burning through resources meant for short bursts, not daily operation.",
      },
      {
        type: "subheading",
        content: "Dorsal Vagal — Immobilization and Conservation",
      },
      {
        type: "paragraph",
        content:
          'The dorsal vagal state is governed by the oldest branch of the vagus nerve. It\'s the body\'s last-resort protection: when the system determines that mobilization won\'t work, it conserves energy by shutting down non-essential functions. Heart rate drops, digestion slows, emotions flatten. In this state, you might feel numb, foggy, disconnected, or chronically fatigued. You can still function — go to work, pay bills, show up where you\'re expected — but there\'s a flatness underneath it. You tell people "I\'m fine, just tired." In small doses, dorsal activation is healthy — it helps you rest, digest, and recover. But when the body defaults to this state, it looks like low motivation, difficulty feeling joy, and going through life on autopilot.',
      },
      {
        type: "heading",
        content: "Beyond the Three States: Learned Behavioral Responses",
      },
      {
        type: "paragraph",
        content:
          "While the three states above are the biological foundations, the body also develops learned behavioral responses that layer on top of them. One of the most significant is the fawn response.",
      },
      {
        type: "subheading",
        content: "The Fawn Response — Safety Through Pleasing",
      },
      {
        type: "paragraph",
        content:
          "The fawn response — a term coined by therapist Pete Walker — isn't a separate nervous system state. It's a learned behavioral strategy that typically develops in environments where connection to a caregiver required self-abandonment. The body learned that safety comes from anticipating and meeting other people's needs, often at the expense of your own. This can involve elements of both sympathetic activation (hypervigilance to others' moods, working overtime to maintain approval) and dorsal shutdown (suppressing your own needs, going numb to your own desires). You over-give. Over-apologize. Over-explain. Boundaries feel dangerous — because in your early environment, they may have been. This isn't weakness. It's an intelligent adaptation that served a real purpose. The work is recognizing when it's still running the show.",
      },
      {
        type: "heading",
        content: "How They Lock Together",
      },
      {
        type: "list",
        content: "Here's how these pieces connect:",
        items: [
          "Everyone moves through all three nervous system states — what runs MOST OFTEN was shaped by early experiences",
          "Learned behavioral responses like fawn develop on top of those biological states",
          "Early conditioning builds identity — not personality, programming",
          "Identity and nervous system reinforce each other in a loop",
          "Repetition strengthens neural pathways — patterns run automatically",
          "Your system defaults to what's familiar, not necessarily what's healthy",
        ],
      },
      {
        type: "emphasis",
        content:
          "This is not theory. This is happening inside your body right now.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PART 3: "Why Change Feels Like a Threat"
  // ─────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "Why Change Feels Like a Threat",
    subtitle: "Part 3 of 3 — The Path Forward",
    estimatedMinutes: 7,
    sections: [
      {
        type: "video-placeholder",
        content:
          "Video: Why Change Feels Like a Threat (Coming Soon)",
      },
      {
        type: "heading",
        content: "Why Change Feels Like a Threat",
      },
      {
        type: "paragraph",
        content:
          "Now you understand the system. You can see the nervous system states. You get that identity was programmed, not chosen. You understand the loop. But here's the part that trips people up — even smart people, even people who've done years of work on themselves.",
      },
      {
        type: "paragraph",
        content:
          "Your nervous system protects three things above all else:",
      },
      {
        type: "list",
        content: "",
        items: [
          "Predictability — what it already knows how to handle",
          "Familiarity — what it recognizes as 'normal' (even if painful)",
          "What has already been survived — it would rather repeat pain than risk the unknown",
        ],
      },
      {
        type: "paragraph",
        content:
          "This means change — real change, the kind that actually shifts your life — is biologically registered as unsafe. Not emotionally. Biologically. Your body doesn't know the difference between 'this is new and good' and 'this is new and dangerous.' It just knows: this is unknown. And unknown means threat. That's why you can want something with your whole heart and still sabotage it. That's why you leave the toxic relationship and end up in another one that looks different but feels the same. Your system isn't choosing what's best. It's choosing what's known.",
      },
      {
        type: "heading",
        content: "Why Knowing Better Doesn't Produce Change",
      },
      {
        type: "paragraph",
        content:
          "This is the part that frustrates high-achieving women the most. You can read the book, understand the pattern intellectually, explain it to your friends over dinner — and still do the exact same thing tomorrow morning. Your prefrontal cortex understands. It gets it. It's on board. But your nervous system doesn't care. It doesn't read books. It doesn't do affirmations. It reads sensation, environment, and familiarity. And it moves faster than your conscious mind ever will. By the time you think, 'I should respond differently this time,' your body has already reacted. The email is sent. The wall is up. The shutdown already happened.",
      },
      {
        type: "list",
        content: "So let's redefine something right now:",
        items: [
          "Safe does not equal healthy",
          "Safe does not equal aligned",
          "Safe does not equal what you actually want",
          "Safe equals what your nervous system already knows how to survive",
        ],
      },
      {
        type: "quote",
        content:
          "Your system isn't trying to hurt you. It's trying to protect you using old instructions.",
      },
      {
        type: "heading",
        content: "The Real Question",
      },
      {
        type: "paragraph",
        content:
          "So if the nervous system is running the show, and it registers change as threat, and willpower can't override it — then the real question isn't 'Why can't I change?' The real question is: how do we make change feel safe to the body? Not to the mind — the mind already gets it. The body. The system that actually controls your behavior.",
      },
      {
        type: "paragraph",
        content: "Three things need to happen:",
      },
      {
        type: "list",
        content: "",
        items: [
          "Awareness — see the identity being protected",
          "Regulation — teach the nervous system it can release that identity without dying",
          "Rewiring — build new neural pathways so a new identity can take root",
        ],
      },
      {
        type: "heading",
        content: "That's What This Assessment Is For",
      },
      {
        type: "quote",
        content:
          "We're about to find out exactly which survival identity YOUR nervous system is protecting, what it costs you, and what to do about it.",
      },
      {
        type: "paragraph",
        content:
          "What you just learned isn't theory — it's happening inside your body right now. The assessment ahead will help you see YOUR specific pattern. Not a generic personality quiz. Not a horoscope repackaged as psychology. A precise map of what your nervous system is doing, why it's doing it, and what it will take to shift it. Answer honestly. There are no wrong answers. Your nervous system already knows the truth — we're just giving your conscious mind permission to see it too.",
      },
    ],
  },
];
