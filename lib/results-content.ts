import type { RegulationPattern, CoreWound, SurvivalIdentity } from './types';

// --- Interface Definitions ---

export interface PatternContent {
  name: string;
  tagline: string;
  description: string;
}

export interface WoundContent {
  name: string;
  description: string;
}

export interface IdentityContent {
  name: string;
  coreBelief: string;
  howItFormed: string;
  howItShowsUp: string;
  whatItCosts: string;
  keyReframe: string;
}

export interface PracticeRecommendation {
  name: string;
  description: string;
  whyForYou: string;
}

export interface ResultsPageContent {
  pattern: PatternContent;
  wound: WoundContent;
  identity: IdentityContent;
  practices: PracticeRecommendation[];
  whatThisMeans: string;
}

// --- Pattern Content ---

export const patternContent: Record<RegulationPattern, PatternContent> = {
  'fight-flight': {
    name: 'Fight/Flight \u2014 The Activated System',
    tagline: 'Your safety has always lived in motion.',
    description: `Your nervous system learned early that safety comes from action. From doing. From staying ten steps ahead. You're not anxious \u2014 you're activated. Your system runs hot because standing still once meant something bad could happen. So you built a life around motion, productivity, and control \u2014 not because you love the grind, but because your body genuinely believes slowing down is dangerous.

On the outside, this looks like success. You're the driven one. The reliable one. The one who always has a plan and a backup plan. People admire your work ethic and your ability to hold it all together. But on the inside? You're exhausted. Hypervigilant. Your mind won't turn off at night. Your body holds tension in places you didn't know could clench. You can't sit still without a to-do list because stillness feels like a threat your system hasn't cleared yet.

Here's what matters: this isn't a personality trait. This isn't "just who you are." This is a survival strategy your nervous system automated a long time ago, and it's been running on autopilot ever since. Your body decided that the world wasn't safe enough to rest in \u2014 so it kept you moving. That decision made sense when it was made. But you're not in that environment anymore, and your system hasn't gotten the memo.

The goal isn't to stop being driven. It's to give your nervous system permission to come down \u2014 so that when you move, it's by choice, not by compulsion. There's a difference between running toward something and running from something. Your body knows the difference even when your mind doesn't.`,
  },

  freeze: {
    name: 'Freeze \u2014 The Shutdown System',
    tagline: "You didn't stop trying. Your system stopped for you.",
    description: `Your nervous system learned that the world was too big, too chaotic, or too unpredictable to fight or run from \u2014 so it did the only thing it could: it shut down. This isn't laziness. This isn't a lack of ambition. This isn't a discipline problem. This is a body that decided the safest thing to do was to disappear \u2014 not physically, but emotionally. To turn the volume down on everything until the danger passed. Except the danger passed a long time ago, and your system never turned the volume back up.

What makes this pattern so disorienting is that it's functional. You still go to work. You still pay your bills. You still show up. But inside? Flat. Muted. Like you're watching your own life through a window instead of living it. Energy that can't be found no matter how much you sleep. Ideas that light up for a moment and then dissolve before they become action. A ceiling you can feel pressing down on you, but you can't name it, can't point to it, can't explain why everything feels so hard when nothing is technically wrong.

This is what functional freeze looks like: a person who appears fine while their nervous system is running on emergency power. You're not thriving \u2014 you're conserving. Your body is rationing energy because at some point it decided that fully engaging with life costs more than it's worth. That's not a character flaw. That's biology doing math based on old data.

The way forward isn't to push harder. Pushing harder is what got you here \u2014 because your system interpreted pressure as more evidence that the world isn't safe. The way forward is gentle, patient re-engagement. Teaching your nervous system, one small experience at a time, that it's safe to come back.`,
  },

  fawn: {
    name: 'Fawn \u2014 The People-Pleasing System',
    tagline: "You became who they needed. Now you can't find who you are.",
    description: `Your system learned that love, safety, and survival all depended on one thing: being what other people needed you to be. You're not weak \u2014 you're hypervigilant in a different direction. While fight/flight watches for external threats, your system watches for emotional shifts in other people. You feel someone's mood change from across the room and you're already adjusting. Already smoothing. Already figuring out what they need before they ask.

This looks like empathy. People call you intuitive, sensitive, a natural caretaker. And you are those things \u2014 but underneath the gift is a survival strategy. Your system learned that other people's emotions were your responsibility, because when they weren't managed, something bad happened. A parent withdrew. A caretaker erupted. The environment became unsafe. So you became the emotional thermostat for everyone around you \u2014 and you've been regulating other people's nervous systems ever since.

The cost is staggering, and it's the one cost you're least likely to notice: you've lost access to yourself. You know what everyone else needs. You know what everyone else feels. But when someone asks you what you want? Blank. When you try to make a decision just for yourself? Paralysis. Not because you don't have desires \u2014 but because your system was never given permission to prioritize them. Your wants got filed under "not important" a long time ago, and now you can't find the folder.

The work here isn't about becoming selfish. It's about becoming visible \u2014 to yourself. Learning that your needs aren't a burden. That your preferences matter. That you're allowed to take up space without earning it by taking care of someone else first. Your nervous system needs to learn a new equation: you can be loved and still have boundaries.`,
  },
};

// --- Wound Content ---

export const woundContent: Record<CoreWound, WoundContent> = {
  'money-scarcity': {
    name: 'The Money/Scarcity Wound',
    description: `Underneath the drive, there's a wound that keeps circling back to scarcity. You've tasted what it feels like to not have enough \u2014 or you grew up watching someone you love drown in the stress of it. Your body made a decision a long time ago that it would never let that happen again. So you work. You save. You strategize. You stay ready. And none of that is the problem. The problem is that the drive never turns off. Even when the bills are paid. Even when you've "made it." Even when the number in your account would have made your younger self cry with relief. Because your nervous system doesn't update based on your bank account \u2014 it updates based on felt safety. And felt safety was never modeled for you.

This wound shows up in ways that don't always look like money. It shows up as difficulty enjoying what you have. As guilt when you spend on yourself. As a constant low-level hum of "what if it all disappears." It shows up in relationships \u2014 choosing partners who feel financially safe over emotionally safe. It shows up in your body \u2014 the tension in your chest when an unexpected bill hits, even when you can cover it ten times over. The scarcity wound isn't about money. It's about a nervous system that never learned what "enough" feels like in the body.

Healing this wound doesn't mean you stop being smart with money. It means your relationship with money stops being driven by fear. It means you can have abundance and actually feel it. Not just in your account \u2014 in your bones.`,
  },

  abandonment: {
    name: 'The Abandonment Wound',
    description: `Somewhere in your story, the message landed: people leave. Or people stay \u2014 but not fully. Not reliably. Not in the way a child needs. Maybe it was a parent who was physically present but emotionally gone. Maybe it was a caretaker who was loving one day and absent the next. Maybe someone left outright. The specifics matter less than the imprint: your nervous system learned that connection is not safe. That depending on someone is a setup for pain.

So your system adapted. Either by becoming so self-sufficient that needing anyone feels dangerous \u2014 or by becoming so attuned to others that you've lost yourself trying to be enough to make someone stay. Sometimes both, depending on the relationship. This wound doesn't always look like fear of being left. Sometimes it looks like never fully arriving. Never letting anyone close enough to leave. Keeping one foot out the door in every relationship. Testing people. Picking partners who confirm the wound \u2014 emotionally unavailable, inconsistent, half-in \u2014 because at least that's a pattern your system knows how to survive.

The path through the abandonment wound isn't about finding someone who will never leave. It's about building a nervous system that can tolerate closeness without bracing for the exit. It's about learning, in your body, that connection doesn't have to come with a countdown.`,
  },

  unworthiness: {
    name: 'The Unworthiness Wound',
    description: `This wound is sneaky. It doesn't announce itself. It doesn't scream. It runs in the background like an operating system you didn't install, whispering: not yet. Not enough. Not ready. You work harder. You achieve more. You check every box. And the goalpost moves. Because the wound isn't about performance \u2014 it's about permission. At some point you received the message that who you are, as you are, isn't enough. And you've been trying to earn your right to exist ever since.

This wound is particularly cruel because it disguises itself as motivation. From the outside, it looks like drive. Ambition. High standards. But on the inside, it feels like running on a treadmill that someone keeps tilting upward. Nothing is ever enough because the wound has already decided the verdict before the evidence comes in. You could achieve everything on your list and still feel like a fraud. That's not imposter syndrome \u2014 that's a nervous system running an unworthiness program that was installed before you had language to question it.

Healing the unworthiness wound doesn't start with affirmations or mindset shifts. It starts with your body. With the felt sense of being enough \u2014 not because of what you've done, but because you exist. That's not a belief you can think your way into. It's a state your nervous system has to learn to hold.`,
  },

  control: {
    name: 'The Control Wound',
    description: `At some point, your environment was so chaotic, so unpredictable, or so unsafe that your system made a decision: I will never be caught off guard again. Control became the strategy. Over your schedule. Your body. Your environment. Your emotions. Your relationships. You built systems, routines, and rules \u2014 not because you're rigid, but because structure was the only thing standing between you and the feeling of everything falling apart.

And it works. Control works beautifully \u2014 until it doesn't. Until the relationship that needs vulnerability. Until the opportunity that requires surrender. Until the body that demands rest it hasn't earned by your rules. Until the moment where life asks you to let go and your hands won't open. Control kept you alive. It kept you organized in chaos. It gave you a sense of agency when everything around you was out of your hands. But it's now keeping you small. Because a life under control is a life within known limits \u2014 and everything you want is on the other side of those limits.

The work isn't about giving up control. It's about recognizing the difference between conscious choice and compulsive grip. It's about teaching your nervous system that uncertainty doesn't equal danger. That you can be safe without knowing what comes next.`,
  },

  'exhaustion-burnout': {
    name: 'The Exhaustion/Burnout Wound',
    description: `This isn't tiredness from working too hard. This is exhaustion that lives in the bones. A tiredness that sleep doesn't fix because it's not about sleep \u2014 it's about a nervous system that has been running defense for years without a break. Your system has been scanning, protecting, adapting, and performing for so long that it's not just tired. It's depleted at the level of your biology. Your adrenals. Your hormones. Your capacity to feel anything other than flat.

Your body hit its limit. Not the limit of what it can do \u2014 the limit of what it can do without feeling safe. There's a difference. You've been asking your system to perform at a high level while simultaneously running survival programs in the background. That's like running twenty apps on a phone with five percent battery. It's not that you're weak. It's that the math doesn't work. You're not burned out on work. You're burned out on surviving.

This wound heals slowly, and it heals from the inside out. Not with productivity hacks or better time management. With genuine nervous system rest \u2014 the kind where your body actually believes it's safe to stop. That takes more than a vacation. It takes a fundamental shift in how your system relates to stillness, safety, and receiving.`,
  },
};

// --- Identity Content ---

export const identityContent: Record<SurvivalIdentity, IdentityContent> = {
  'the-provider': {
    name: 'The Provider',
    coreBelief: "If I don't hold it together, everything falls apart.",
    howItFormed: `You grew up in an environment where someone had to be the responsible one \u2014 and it became you. Maybe you were the oldest. Maybe a parent was absent, struggling, or overwhelmed and you stepped in before anyone asked. Maybe it was financial. Maybe it was emotional. Either way, you learned early that your worth was tied to what you could carry for others. Not who you were \u2014 what you could do. And you've been carrying ever since. The role wasn't offered \u2014 it was absorbed. And because it happened so early, it doesn't feel like a role at all. It feels like identity.`,
    howItShowsUp: `Over-working even when your body is begging you to stop. Difficulty delegating because no one does it "right" (translation: no one does it the way your survival requires). Guilt when you rest \u2014 real, physical guilt, not just mental. Financial hypervigilance even when you're stable. Taking on everyone's problems as if they're your own. Physical tension you carry like a second skin \u2014 shoulders, jaw, lower back. The feeling that if you step back, even for a day, something will collapse. Not because it's true, but because your system is convinced it's true.`,
    whatItCosts: `Joy. Spontaneity. Vulnerability. The ability to be taken care of. The freedom to fail without the world ending. Your body is always braced for the next crisis because your system believes one is always coming. You've become so good at holding everything together that no one thinks to ask if you're okay. And you've become so used to not being asked that you've stopped knowing the answer. The provider identity costs you the very thing you give everyone else: the experience of being held.`,
    keyReframe: `You don't have to earn your place here. The people who love you aren't waiting for you to produce. They're waiting for you to exhale. Your value was never in what you carry \u2014 it was always in who you are when you set it down.`,
  },

  'the-hyper-independent': {
    name: 'The Hyper-Independent One',
    coreBelief: "I don't need anyone. Depending on people is dangerous.",
    howItFormed: `At some point, depending on someone resulted in disappointment, betrayal, or absence. Maybe you asked for help and it didn't come. Maybe the person you trusted the most let you down in a way your body never forgot. Maybe no one was available in the first place. Your system decided: never again. You built a life where you don't have to ask for help \u2014 and you call it strength. And it is strong. But it's also a fortress. And the thing about fortresses is that they keep danger out and loneliness in.`,
    howItShowsUp: `Resistance to delegation \u2014 at work, at home, everywhere. Difficulty accepting support even when it's offered freely. Discomfort with vulnerability that borders on physical. Pride in "doing it all alone" that sounds like confidence but feels like armor. An attraction to partners you can't fully lean on \u2014 which conveniently confirms the belief that depending on people is a bad idea. Exhaustion you won't name because naming it means admitting you need something you've sworn you don't.`,
    whatItCosts: `Intimacy. Real intimacy \u2014 not the kind where someone is near you, but the kind where someone is with you. Softness. The experience of being held without earning it first. The deep rest that only comes from knowing someone else has your back. You've built a life that works on paper, but it runs on a single point of failure: you. And that's not freedom. That's a system with no backup.`,
    keyReframe: `Independence isn't freedom when it's compulsive. You didn't choose this \u2014 your nervous system chose it for you after someone taught you that needing people has a cost. You don't have to earn safety by never needing anyone. The strongest thing you can do is let someone in.`,
  },

  'the-functional-freeze': {
    name: 'The Functional Freeze',
    coreBelief: "I'm fine. I'm just tired.",
    howItFormed: `Your system experienced something too overwhelming to process \u2014 and it didn't have to be one big event. It could have been years of low-level emotional neglect. A household that was technically fine but emotionally vacant. Chronic instability that never rose to the level of crisis but never settled into safety either. Your body chose the most efficient survival strategy available: conserve energy. Go through the motions. Don't feel too much. Don't want too much. Don't risk too much. The shutdown happened gradually, so gradually that you thought this was just who you are.`,
    howItShowsUp: `Chronic fatigue that doesn't respond to sleep. Difficulty starting tasks \u2014 not because you don't want to, but because your body physically won't engage. Procrastination that feels physical, not mental. Emotional flatness where you know you should feel something but can't access it. Doom-scrolling. Binge-watching. Difficulty connecting to desire or ambition. The gap between "I know what I should do" and actually doing it \u2014 a gap that feels like wading through wet concrete. Plans that excite you for an hour and then dissolve into fog.`,
    whatItCosts: `Presence. Aliveness. The full range of emotion \u2014 including the good ones. Career momentum that stalls not from lack of talent but from lack of activation. Relationship depth that stays shallow because depth requires energy your system won't release. The ability to feel genuine excitement about your own future. You're not missing motivation. You're missing the biological green light that says it's safe to engage.`,
    keyReframe: `You're not lazy. You're not "just like this." Your system shut down to survive something it couldn't process \u2014 and it hasn't gotten the signal that it's safe to come back online. That signal doesn't come from willpower. It comes from safety. Consistent, felt, embodied safety. And building that safety is the work.`,
  },

  'the-self-saboteur': {
    name: 'The Self-Saboteur',
    coreBelief: "If I don't mess it up first, it'll hurt less when it falls apart.",
    howItFormed: `You learned \u2014 usually through direct experience \u2014 that good things don't last. Something good arrived and then was taken. A period of peace was followed by chaos. A win was followed by punishment, jealousy, or loss. Your system absorbed the pattern and developed a strategy: end it before it ends you. Mess it up before it matters too much. Stay small so the fall isn't far. This isn't self-destruction \u2014 it's preemptive protection. Your nervous system would rather experience a controlled loss than an uncontrolled one.`,
    howItShowsUp: `Starting strong then losing momentum right before the finish line. Pushing away partners when things get close \u2014 picking a fight, going cold, finding a flaw that justifies leaving. Overspending or making reckless decisions when money starts flowing in. Missing deadlines right before the win. Procrastinating on the thing that matters most. Picking fights when things feel peaceful \u2014 because peace feels suspicious to a system that was trained on chaos.`,
    whatItCosts: `Everything you've been working toward. Every time your system runs this pattern, it confirms the belief that you can't have good things \u2014 and the cycle deepens. The tragedy isn't that you can't build something beautiful. You can. You do. The tragedy is that your system tears it down right before you get to live in it. And then you blame yourself, which adds shame to the wound, which makes the next cycle even harder to break.`,
    keyReframe: `You're not destroying your life. You're protecting yourself from a pain that already happened. Your nervous system is replaying an old script \u2014 one where good things always had a cost. The future isn't a replay of the past. Not unless your nervous system is still running the program. And programs can be rewritten.`,
  },

  'the-mask': {
    name: 'The Mask',
    coreBelief: "Who I really am isn't safe.",
    howItFormed: `You learned that your authentic self \u2014 your needs, your emotions, your truth \u2014 wasn't welcomed. Maybe you were told you were too loud. Too sensitive. Too much. Or not enough. Maybe your feelings were dismissed, mocked, or punished. Maybe you watched what happened to someone else who was authentic and decided: not me. So you built a version that was acceptable. Palatable. Safe. And that version worked so well, for so long, that it became the default. The mask isn't something you put on \u2014 it's something that grew into your skin.`,
    howItShowsUp: `Not knowing what you actually want when someone asks. Changing your behavior, your tone, your opinions based on who you're around. Difficulty with authenticity in close relationships \u2014 because closeness means someone might see behind the mask. Performing "fine" when you're anything but. A gap between your public persona and your private experience that feels like living a double life. Identity confusion \u2014 not knowing who you are outside of your roles. The exhaustion of maintaining a version of yourself that was built for someone else's comfort.`,
    whatItCosts: `Self-trust. Genuine connection. The ability to be loved for who you actually are \u2014 because no one has met that person. Including you. The mask costs you the one thing it was designed to protect: yourself. You've been so busy being acceptable that you've lost access to what's authentic. And the longer the mask stays on, the harder it becomes to remember there's a face underneath it.`,
    keyReframe: `The mask kept you safe in a world that couldn't handle your truth. That was smart. That was survival. But you're not in that world anymore. And the people meant for you? They're not waiting for the polished version. They're waiting for the real one. The one you've been protecting all this time.`,
  },

  'the-rage-holder': {
    name: 'The Rage Holder',
    coreBelief: "If I let this out, I'll lose control.",
    howItFormed: `You experienced situations where your anger was either punished, dismissed, or met with danger. Maybe a parent raged and you saw what uncontrolled anger does. Maybe you expressed anger as a child and were shamed for it \u2014 told you were bad, ungrateful, too much. Maybe your household had an unspoken rule: don't rock the boat. Either way, the message landed in your body like concrete: your anger is dangerous. So you locked it down. Swallowed it. Sat on it. Smiled through it. For years. Maybe decades. And your body has been holding the bill.`,
    howItShowsUp: `Jaw tension. Grinding teeth at night. Chronic muscle tightness \u2014 especially in the shoulders, neck, and hips. Sudden eruptions over small triggers that leave you confused at your own intensity. Passive aggression because direct aggression was never safe. Sarcasm as a shield. Difficulty setting boundaries \u2014 because boundaries require the energy of anger, and your system won't let you access it cleanly. Emotional numbness \u2014 because rage suppressed long enough doesn't disappear. It converts. Into depression. Into freeze. Into a body that aches for reasons doctors can't find.`,
    whatItCosts: `Authentic expression. The ability to set boundaries cleanly and without guilt. Your full emotional range \u2014 because when you suppress one emotion, the others get muted too. Sometimes it costs your physical health. Chronic pain, digestive issues, autoimmune flares \u2014 the body stores what the mouth doesn't say. It also costs you relationships, not because you're angry, but because you're not. Because the people closest to you can feel the wall, even if they can't name it.`,
    keyReframe: `Your anger isn't the problem. Suppressing it is. Rage is just fire without a container. It's not something to eliminate \u2014 it's something to learn to hold. Anger, when it's integrated, is one of the most powerful forces you have. It's what says "no" when you need to. It's what protects what matters. You don't need less anger. You need a safe way to feel it.`,
  },

  'the-good-one': {
    name: 'The Good One',
    coreBelief: "If I'm good enough, everything will stay okay.",
    howItFormed: `You learned that love, safety, or stability was conditional. Good behavior equaled love. Bad behavior \u2014 or even neutral behavior \u2014 equaled withdrawal, punishment, or chaos. So you became good. Not just well-behaved \u2014 strategically compliant. You learned the rules before anyone spoke them. You anticipated what was needed before it was asked. You made yourself small, agreeable, and easy to be around \u2014 because the alternative was losing the only safety you had. And you've been running that program ever since, in every relationship, every job, every room you walk into.`,
    howItShowsUp: `Over-apologizing \u2014 for your needs, your space, your existence. An inability to say no without a wave of guilt that feels physical. Resentment that builds silently because you keep saying yes when your body is screaming no. Perfectionism \u2014 not as a trait but as a strategy. Caretaking at your own expense. A high tolerance for poor treatment because "at least it's stable." Chronic people-pleasing that you've mistaken for kindness. The feeling that if you stop being good, you'll stop being loved.`,
    whatItCosts: `Your own voice. Your own needs. The ability to receive without guilt or the compulsion to immediately reciprocate. Resentment that corrodes from the inside \u2014 because suppressed needs don't disappear. They ferment. A life spent earning love you should have received for free. And the deepest cost: you don't actually know if people love you or love the version of you that performs. Because you've never given them the chance to meet the unperformed version.`,
    keyReframe: `You don't have to be good to be loved. You were always worthy of love \u2014 even on your worst day. Especially on your worst day. The people worth keeping aren't the ones who need you to be perfect. They're the ones who stay when you're not. And you deserve to find out who those people are.`,
  },

  'the-survivor-who-cant-receive': {
    name: "The Survivor Who Can't Receive",
    coreBelief: "I know how to survive. I don't know how to receive.",
    howItFormed: `You survived things that would have broken most people. And because you survived, you built an entire identity around resilience. Around toughness. Around being the one who can handle it. And you can. That's not a lie \u2014 it's proven fact. But here's what no one told you: survival mode and receiving mode are opposite nervous system states. Your body can't clench and open at the same time. You can't grip the wheel with white knuckles and also let someone hand you something soft. Your system got stuck in survival position, and it never learned the posture of receiving.`,
    howItShowsUp: `Deflecting compliments \u2014 immediately, almost reflexively. Discomfort with gifts or help that borders on agitation. Difficulty relaxing into pleasure, ease, or downtime. Working through vacations because stillness feels unproductive and unproductive feels unsafe. Not knowing what to do with downtime that doesn't involve recovery from crisis. Being the strong friend, the anchor, the one everyone leans on \u2014 but never the one who leans. An inability to enjoy what you've built because your system is already bracing for the next thing that could take it away.`,
    whatItCosts: `Joy. Pleasure. The full spectrum of human experience that exists beyond survival. A life that includes not just getting through it, but actually enjoying it. Relationships where you're held, not just holding. Rest that doesn't require justification. The ability to look at what you've built and feel it in your body \u2014 not just know it in your mind. You've earned a life that feels as good as it looks. But your nervous system won't let you collect.`,
    keyReframe: `You've proven you can survive anything. That's no longer in question. Now it's time to prove something harder: that you can receive something. Not because you earned it. Not because you suffered enough to deserve it. Because you're here. And being here is the only qualification that matters.`,
  },
};

// --- Practices by Pattern ---

export const practicesByPattern: Record<RegulationPattern, PracticeRecommendation[]> = {
  'fight-flight': [
    {
      name: 'Vagal Toning',
      description:
        'Humming, singing, or gargling to activate the vagus nerve and signal safety to your system. Start with 2-3 minutes of sustained humming \u2014 feel the vibration in your chest and throat. This directly stimulates the nerve that tells your body the threat is over.',
      whyForYou:
        "Your nervous system is stuck in 'go' mode. It's been running the threat-detection program for so long that it doesn't know how to stand down. Vagal toning directly activates the calming branch of your nervous system \u2014 the one that got drowned out by all the alarm bells. This isn't relaxation. It's a biological override.",
    },
    {
      name: 'Down-Regulation Breathwork',
      description:
        'Extended exhale breathing: inhale for 4 counts, hold for 4 counts, exhale for 8 counts. The extended exhale is the key \u2014 it activates your parasympathetic nervous system and shifts your body from sympathetic activation into recovery mode. Practice for 3-5 minutes.',
      whyForYou:
        "Your system is biased toward action. It's been favoring the gas pedal for years and your brake pedal is weak from disuse. This specific breathwork pattern literally slows your heart rate and lowers cortisol. It's not about calming your mind \u2014 it's about retraining your body's default setting.",
    },
    {
      name: 'Body Scan for Release',
      description:
        'A guided practice of scanning from head to toe, noticing where you hold tension, and consciously softening each area. Not forcing relaxation \u2014 just noticing and inviting. Start at your jaw. Move to your shoulders. Your hands. Your belly. Your hips. Everywhere your body has been silently bracing.',
      whyForYou:
        "You've been clenching muscles you didn't know you were using. Your body has been in a low-grade brace position for so long it feels normal. This practice teaches your body it's safe to let go \u2014 one muscle group at a time. It's not about relaxation. It's about giving your system permission to stand down.",
    },
    {
      name: 'Grounding Meditation',
      description:
        'A seated or standing practice focused entirely on the present moment. Feel the weight of your body in the chair. The ground beneath your feet. The temperature of the air. This is not visualization \u2014 it is sensory anchoring. Your only job is to be where you are.',
      whyForYou:
        "Your mind lives in the future \u2014 scanning, planning, preparing for threats that haven't arrived yet. This practice brings your nervous system into now. Not into a concept of now. Into the physical, felt experience of this moment. Because right now, in this second, you're safe. Your body just needs to feel it.",
    },
  ],

  freeze: [
    {
      name: 'Gentle Activation Practices',
      description:
        "Small, manageable movements designed to safely bring energy back into a shutdown system. Stretching. Shaking your hands. Walking around the room. Nothing intense \u2014 just enough to remind your body that movement is available. Start with 30 seconds of shaking your arms and legs. That's it.",
      whyForYou:
        "Your system shut down to protect you. It conserved energy because engaging with the world felt too costly. These practices gently wake it back up without overwhelming it. Think of it like warming up a car that's been sitting in the cold \u2014 you don't floor the gas. You idle. You let the engine remember what it can do.",
    },
    {
      name: 'Pendulation',
      description:
        "Alternating your attention between a place of tension or discomfort in your body and a place of ease or neutrality. You don't try to fix either one. You just move your awareness back and forth. Tension. Ease. Tension. Ease. This teaches your system that both states are available.",
      whyForYou:
        "This practice teaches your nervous system that it can move between states \u2014 that feeling isn't permanent and safety is available right now, in your own body. For a system stuck in freeze, the biggest breakthrough isn't activation. It's learning that you're not locked into one state forever.",
    },
    {
      name: 'Orienting Exercises',
      description:
        'Slowly looking around your environment. Not scanning for threats \u2014 just seeing. Name five things you can see. Four you can hear. Three you can touch. Turn your head slowly. Let your eyes land where they want to. Engage your senses one at a time.',
      whyForYou:
        "Freeze disconnects you from the present moment. It pulls you out of your body and out of your environment. Orienting brings you back. It tells your nervous system: you're here. You're in a room. The room is safe. Your senses are available. Start with where you are.",
    },
    {
      name: 'Somatic Awakening',
      description:
        'A guided movement practice designed to reconnect sensation, emotion, and physical awareness. This can be as simple as placing your hands on your chest and noticing what you feel. Warmth. Pressure. Your own heartbeat. The goal is connection, not performance.',
      whyForYou:
        "You've been numb for a reason \u2014 your system turned down the volume on sensation because feeling too much was dangerous. This practice creates safe pathways back to feeling. Not all at once. Not overwhelmingly. Just enough to remind your body that sensation isn't the enemy.",
    },
  ],

  fawn: [
    {
      name: 'Boundary Meditations',
      description:
        "A guided visualization of your personal space. Imagine an edge around you \u2014 a line, a glow, a boundary. Notice where it is. Notice what it feels like. Practice feeling the difference between what's inside that boundary (yours) and what's outside it (not yours). This is not about walls. It's about edges.",
      whyForYou:
        "You've spent so long attuned to others that you've lost where they end and you begin. This practice rebuilds that line. Not to keep people out \u2014 but so you know what's yours to carry and what isn't. A boundary isn't a rejection. It's a definition. And you've been undefined for too long.",
    },
    {
      name: 'Self-Connection Practices',
      description:
        "Body-based check-ins where you pause and ask yourself: 'What do I need right now?' Not what does the room need. Not what does this person need. What do I need. Then sit with whatever comes up \u2014 even if the answer is 'I don't know.' Especially then.",
      whyForYou:
        "Your first instinct in every moment is to check what others need. This practice redirects that instinct inward. It's going to feel strange at first \u2014 maybe even selfish. That discomfort is the wound talking. Your needs aren't a burden. They're information. And you've been ignoring that information for years.",
    },
    {
      name: "'What Do I Actually Need' Body Check-Ins",
      description:
        "Pausing three times a day to ask your body \u2014 not your mind \u2014 what it needs. Place a hand on your stomach or chest. Breathe. Ask. Listen. The answer might be water. Rest. Space. Silence. Movement. It doesn't have to be profound. It just has to be yours.",
      whyForYou:
        "You know what everyone else needs. You can read a room faster than most people can read a menu. But you've turned that radar outward for so long that the inward signal is almost silent. This practice teaches you to ask yourself first. Not instead of others \u2014 but before.",
    },
    {
      name: 'Assertive Energy Work',
      description:
        "Practices that build the felt sense of taking up space. Standing with your feet wide. Pressing your palms into a wall and feeling your own strength. Speaking your name out loud. Saying 'no' to an empty room. This isn't about aggression. It's about presence.",
      whyForYou:
        "Your system learned that your needs are secondary \u2014 that your job is to accommodate, not assert. This practice rewires that pattern at the body level. Not through affirmations. Through the physical experience of taking up space and not apologizing for it. Your body needs to learn that you're allowed to exist at full volume.",
    },
  ],
};

// --- Personalized CTA Content ---

export const personalizedCTA: Record<RegulationPattern, { headline: string; subline: string; buttonText: string; urgencyLine: string }> = {
  'fight-flight': {
    headline: 'Your system is running on overdrive. The practices inside will teach it how to come down.',
    subline: 'You\'ve spent years running. The community gives you the tools to finally land — without losing your edge.',
    buttonText: 'Start Your Recovery Protocol',
    urgencyLine: 'Your nervous system has been in fight-or-flight for years. Every day without regulation is another day it digs the pattern deeper.',
  },
  freeze: {
    headline: 'Your system shut down to protect you. The practices inside will bring it back online — safely.',
    subline: 'Willpower hasn\'t worked because this isn\'t a willpower problem. It\'s a nervous system problem. The community meets you where your body actually is.',
    buttonText: 'Begin Your Thaw Protocol',
    urgencyLine: 'The longer your system stays in freeze, the more it normalizes shutdown. Gentle, consistent nervous system work is the only way back online.',
  },
  fawn: {
    headline: 'You\'ve been building everyone else\'s life. The practices inside will help you build yours.',
    subline: 'You don\'t need to learn how to care less. You need to learn how to include yourself in the care you give everyone else.',
    buttonText: 'Start Your Reclamation Protocol',
    urgencyLine: 'Every day you prioritize everyone else\'s nervous system over your own, the fawn pattern deepens. This is the work that changes that.',
  },
};

// --- Value Stack Content ---

export const communityValueStack = [
  {
    title: 'Your Personalized Regulation Toolkit',
    description: 'Specific somatic practices matched to your pattern — not generic advice, but exercises designed for how YOUR nervous system works.',
  },
  {
    title: 'Weekly Live Nervous System Sessions',
    description: 'Guided regulation sessions where you don\'t just learn the theory — you practice it in real time, with support.',
  },
  {
    title: 'The Full Identity Breakdown Workshop',
    description: 'Go deeper than this assessment. Understand exactly how your survival identity formed, how it runs your decisions, and how to interrupt it.',
  },
  {
    title: 'Private Community of People Who Get It',
    description: 'No toxic positivity. No "just think happy thoughts." A space where people understand what it means to heal a nervous system — because they\'re doing it too.',
  },
  {
    title: 'Monthly Wound-Specific Masterclasses',
    description: 'Deep dives into each core wound — scarcity, abandonment, unworthiness, control, burnout — with actionable rewiring exercises.',
  },
  {
    title: 'DM Access to Your Healing Guide',
    description: 'You\'re not figuring this out alone. Direct message access means your questions get answered, your blocks get seen, and your progress gets guided.',
  },
];

// --- Social Proof Content ---

export const socialProofData = {
  memberCount: '200+',
  tagline: 'people already healing their nervous system inside the community',
  testimonials: [
    {
      quote: 'I finally understand why I could never just "relax." My body wasn\'t broken — it was protecting me. The practices in here actually changed how my nervous system responds.',
      name: 'Member',
      pattern: 'Fight/Flight',
    },
    {
      quote: 'I thought I was lazy my whole life. Turns out my system was in freeze. Three weeks of the somatic work in here and I felt something shift that years of therapy hadn\'t touched.',
      name: 'Member',
      pattern: 'Freeze',
    },
    {
      quote: 'I didn\'t even know I was fawning until this assessment. Now I catch it in real time. The community gave me the tools AND the support to actually stop the pattern.',
      name: 'Member',
      pattern: 'People-Pleasing',
    },
  ],
};

// --- Open Loop / Teaser Content ---

export const lockedContentTeaser: Record<RegulationPattern, string[]> = {
  'fight-flight': [
    'Your 3-Phase Deactivation Protocol (specific to your fight/flight pattern)',
    'The exact somatic exercise that interrupts your activation cycle in under 2 minutes',
    'Why your "morning routine" is actually making your pattern worse — and what to do instead',
    'The body-based practice that teaches your system it\'s safe to stop',
  ],
  freeze: [
    'Your Gentle Reactivation Protocol (designed specifically for freeze patterns)',
    'The 90-second body practice that sends a "safe to engage" signal to your nervous system',
    'Why pushing harder keeps you MORE frozen — and the counterintuitive path back online',
    'The daily micro-practice that rebuilds your connection to desire and motivation',
  ],
  fawn: [
    'Your Boundary Reclamation Protocol (built for fawn patterns)',
    'The body scan practice that catches fawning BEFORE it starts',
    'Why your "empathy" is actually hypervigilance — and how to tell the difference',
    'The 3-step process for checking in with YOUR needs before responding to everyone else\'s',
  ],
};

// --- What This Means Content ---

export const whatThisMeansContent: Record<RegulationPattern, string> = {
  'fight-flight': `Your results point to a nervous system that has been running in activation mode for a long time \u2014 likely longer than you realize. This isn't a diagnosis and it isn't a label. It's a map. It tells you where your system defaulted under stress, what wound that default is protecting, and what identity you built to make it all make sense. All of it made sense when it was formed. Every pattern served a purpose. But the strategies that kept you alive are now keeping you stuck \u2014 overworking, over-controlling, unable to rest, unable to receive, always braced for impact.

What you need isn't more willpower or a better morning routine. You need three things, in order: regulation, rewiring, and alignment. Regulation means teaching your nervous system to come down from the activated state it's been living in. Rewiring means interrupting the old beliefs and patterns that your survival identity runs on. Alignment means building a life \u2014 relationships, work, finances, health \u2014 that matches who you actually are, not who you had to become to survive. That's the work. Not fixing yourself. Updating your system.`,

  freeze: `Your results point to a nervous system that has been running in conservation mode \u2014 a system that shut down, not because you gave up, but because the cost of staying engaged became too high. This isn't laziness and it isn't depression, although it might look like both from the outside. It's a biological strategy. Your system chose to protect you by pulling the plug on full engagement, and it hasn't turned back on because it never got a clear signal that the threat is over.

What you need isn't motivation or accountability. You need three things, in order: regulation, rewiring, and alignment. For you, regulation means gently bringing your system back online \u2014 not with force, but with safety. Your body needs to learn that engaging with life won't cost more than it can pay. Rewiring means interrupting the beliefs that keep you stuck: that you're lazy, that everyone else can do this and you can't. Those aren't truths. They're symptoms of a system in conservation mode. Alignment means building a life that your nervous system can actually sustain \u2014 one that doesn't require you to override your body to participate in. That's not lowering the bar. That's building the right one.`,

  fawn: `Your results point to a nervous system that learned to survive by orienting entirely around other people. This isn't a flaw in your character. It's a deeply intelligent adaptation to an environment where your safety depended on managing other people's emotional states. You became a master of attunement \u2014 not because you're naturally selfless, but because your system decided that selflessness was the price of survival. And now that pattern runs on autopilot, in every relationship, every room, every decision.

What you need isn't to become more selfish or to "stop caring." You need three things, in order: regulation, rewiring, and alignment. For you, regulation means learning to check in with your own body before checking in with everyone else's. It means building the capacity to sit with your own discomfort without immediately rushing to fix someone else's. Rewiring means dismantling the belief that your worth is determined by your usefulness \u2014 that you have to earn love by being indispensable. Alignment means building a life where your relationships, your work, and your daily choices reflect who you actually are, not who everyone needs you to be. That's not abandoning people. That's finally including yourself.`,
};
