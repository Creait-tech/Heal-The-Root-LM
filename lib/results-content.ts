import type { IdentityType, NervousSystemState, CombinationKey } from './types';

// --- Interface Definitions ---

export interface IdentityProfile {
  coreBelief: string;
  summary: string;
  headers: string[];
  paragraphs: string[];
  regulated: string;
}

export interface MeditationRecommendation {
  title: string;
  body: string;
}

// --- Identity Profiles ---

export const IDENTITY_PROFILES: Record<IdentityType, IdentityProfile> = {
  ACHIEVER: {
    coreBelief: 'If I produce, I\'m safe.',
    summary:
      'Your nervous system learned early that momentum equals safety. So you became the one who handles it, solves it, leads it, carries it. You don\'t just want success \u2014 you want to eliminate the possibility of collapse. And that pattern is running you harder than you realize.',
    headers: [
      'How This Pattern Usually Forms',
      'What This Identity Actually Means',
      'Micro-Experiences That Reveal This Pattern',
      'What You Don\'t Say Out Loud',
      'Your Main Motivations',
      'The Story You\'re Telling Yourself',
      'Why This Pattern Is So Hard To Let Go Of',
      'The Cost',
      'The Hidden Fear',
      'What This Means',
    ],
    paragraphs: [
      'You didn\'t wake up one day and decide to become hyper-competent.\n\nThis identity is usually built in environments where stability depended on someone stepping up. Adults were overwhelmed, absent, or inconsistent. Money or safety felt fragile. You were praised for being "mature" or "responsible." You learned early that being useful earned approval.\n\nSometimes it looked like: parentification (emotionally or practically), watching stress you couldn\'t fix, financial instability, being the "smart one" or "strong one," realizing no one was coming to save the situation.\n\nYour system learned something powerful: "If I can handle it, we survive." And it worked. That\'s the important part. It worked.',
      'Being productive isn\'t about ambition for you. It\'s about control. Momentum feels like safety. Achievement feels like protection. Handling things feels like control over chaos. When things are moving forward, you feel grounded. When momentum slows, your body feels exposed. You don\'t trust ease. You trust effort.',
      'You feel restless during downtime. You open your laptop "just to check something." You add tasks after finishing a big win. You feel guilty relaxing while others are working. You think in terms of efficiency and optimization. You tie your self-worth to output. You rarely feel "done." Even celebration feels uncomfortable. Because celebration equals pause. And pause feels dangerous.',
      'You don\'t say this. But internally you sometimes think: "If I slow down, everything will fall apart." "No one will respect me if I\'m not producing." "I can\'t afford to drop the ball." "If I\'m not exceptional, I\'m replaceable." "Rest is earned \u2014 and I\'m not there yet." You don\'t admit how much pressure you\'re carrying. Because pressure is normal to you.',
      'You want financial safety, independence, to never feel powerless again, to never depend on unstable systems, to be the one others can rely on. You don\'t just want money. You want insulation from vulnerability. You don\'t just want success. You want to eliminate the possibility of collapse.',
      '"I\'m just driven." "I like to win." "I have high standards." And yes \u2014 that\'s true. But underneath that is something quieter: "If I stop being impressive, I stop being safe." That story runs deep. Often so deep you don\'t realize it\'s there.',
      'This pattern is hard to let go of because it\'s never failed you. It got you here. It built your competence. It built your independence. It built your leadership. The problem isn\'t that you\'re ambitious. The problem is that your nervous system never got the update that says: "You\'re not surviving anymore." So it keeps pushing. Even when pushing isn\'t necessary.',
      'Over time this identity creates: chronic tension, burnout cycles, difficulty receiving support, relationships that feel secondary to productivity, anxiety during stillness, a subtle loneliness at the top. You look strong. But inside, it can feel like you\'re never fully off-duty.',
      'If you\'re honest, the real fear isn\'t failure. It\'s irrelevance. It\'s being average. It\'s being overlooked. It\'s being dependent. It\'s going backward. You are not afraid of hard work. You are afraid of instability.',
      'You don\'t need to stop being driven. You need your system to feel safe without constant output. Because right now, your worth is tied to usefulness. And your nervous system equates stillness with danger. That\'s not a character flaw. That\'s conditioning. And conditioning can be updated.',
    ],
    regulated:
      'You still produce. But production no longer determines your worth.\n\nYou can work hard without bracing. You can rest without guilt. You can celebrate wins without immediately raising the bar.\n\nMomentum feels exciting \u2014 not necessary for survival. You move from choice. Not urgency.\n\nYou don\'t collapse when things slow. You recalibrate.\n\nYour ambition becomes sustainable.',
  },

  ANCHOR: {
    coreBelief: 'If I hold everyone together, I belong.',
    summary:
      'Your nervous system learned that connection required management. You became the reader of rooms, the scanner of faces, the one who sensed every subtle shift \u2014 not because you were dramatic, but because your belonging depended on it. And now that vigilance is exhausting you.',
    headers: [
      'How This Pattern Usually Forms',
      'What This Identity Protects',
      'Micro-Experiences That Reveal This Pattern',
      'What You Don\'t Say Out Loud',
      'The Story You\'re Telling Yourself',
      'Why This Pattern Is So Hard To Let Go Of',
      'The Cost',
      'What This Means',
    ],
    paragraphs: [
      'This identity is deeply attachment-based. It often forms in early environments where connection felt conditional, unstable, or emotionally unpredictable.\n\nMaybe love was present \u2014 but inconsistent. A caregiver was overwhelmed, anxious, depressed, or reactive. Conflict felt unsafe or unresolved. You learned that closeness required emotional labor.\n\nYour nervous system learned that connection required management. So you became highly attuned. You read tone. You scanned faces. You sensed subtle shifts. Not because you were dramatic. Because your belonging depended on it.',
      'This identity protects attachment security. More specifically, it protects against being emotionally dropped. Your system equates: harmony with safety, tension with threat, disconnection with danger.\n\nSo when someone withdraws, gets quiet, or shifts tone \u2014 your body reacts before your mind does. You may call it "being sensitive." But it\'s vigilance. Attachment vigilance.',
      'You notice when someone texts differently. You feel responsible for resolving tension quickly. You over-explain your intentions. You apologize to stabilize connection. You feel uneasy when someone is upset with you. You replay conversations wondering if you caused distance. You feel relief when things are "back to normal." Your nervous system relaxes when connection feels stable.',
      'You rarely say this, but internally you might think: "I don\'t want to be too much." "I don\'t want to push them away." "I\'ll just smooth this over." "It\'s easier if I handle it." "If they pull back, I must have messed up." You don\'t consciously believe you\'re unworthy. But your body sometimes acts like you could be left.',
      '"I\'m just empathetic." "I care deeply." "I don\'t like conflict." All true. But underneath that is a quieter truth: "If I\'m not emotionally valuable, I\'m replaceable." You don\'t just want love. You want secure, uninterrupted connection.',
      'The more you manage connection, the less secure you actually feel. Because true security requires not having to manage everything. And your nervous system hasn\'t fully learned that yet. So even in healthy relationships, you can feel on edge. Not because your partner is unstable. But because your early attachment map was.',
      'Over time this creates: emotional exhaustion, suppressed needs, one-sided dynamics, difficulty expressing anger, fear of being "too much," fear of being emotionally dropped. You are deeply relational. But you rarely let yourself be the unstable one.',
      'You don\'t need to stop caring. You need to feel secure even when you\'re not managing. True attachment security feels like: "I can stay connected even if someone is momentarily uncomfortable." Your system is still learning that.',
    ],
    regulated:
      'You still care deeply. But you no longer manage everyone\'s emotional temperature.\n\nYou allow others to feel what they feel without absorbing it. You express your needs directly. You tolerate distance without spiraling.\n\nConnection feels secure \u2014 not fragile. You belong without over-functioning.\n\nYour empathy becomes strength. Not self-erasure.',
  },

  OPERATOR: {
    coreBelief: 'No one is coming. I handle it.',
    summary:
      'Your nervous system learned that relying on yourself was the only predictable option. Independence became your armor \u2014 not because you\'re arrogant, but because being let down once hurt enough that you decided: never again. Now you carry everything alone and call it strength.',
    headers: [
      'How This Pattern Usually Forms',
      'What This Identity Protects',
      'Micro-Experiences That Reveal This Pattern',
      'What You Don\'t Say Out Loud',
      'The Story You\'re Telling Yourself',
      'The Hidden Fear',
      'The Cost',
      'What This Means',
    ],
    paragraphs: [
      'This identity often forms when support was inconsistent or unreliable. Asking for help led to disappointment. Emotional needs were minimized. You were praised for being "independent." You had to figure things out early.\n\nSometimes it looked like: caregivers who were physically present but emotionally unavailable, promises that weren\'t kept, being told to "stop being dramatic," having to solve adult problems alone, being the one who didn\'t cause trouble.\n\nYour nervous system learned something simple and powerful: "If I rely on myself, I won\'t be let down." And that became your operating system.',
      'It protects you from disappointment. More specifically, it protects you from the vulnerability of needing someone and not being met. Independence feels stable. Self-reliance feels predictable. Control feels safe. You don\'t avoid support because you\'re arrogant. You avoid it because unpredictability once hurt.',
      'You automatically say "I got it." You struggle to delegate. You feel tense when someone offers to help. You prefer solving problems alone. You get irritated when people don\'t meet your standards. You avoid explaining your emotional state. You handle things quietly without asking. You often carry more than people realize. And you rarely let them see it.',
      'You may never admit this, but internally you sometimes think: "It\'s easier if I just do it myself." "People slow things down." "If I depend on someone, I\'ll regret it." "I don\'t want to owe anyone." "Needing someone makes me vulnerable." You don\'t say it. But you feel it.',
      '"I\'m just independent." "I don\'t like drama." "I\'m low-maintenance." "I don\'t need much." All true. But underneath that is something deeper: "If I don\'t need anyone, no one can hurt me."',
      'Your fear isn\'t chaos. It\'s exposure. It\'s asking for support and not receiving it. It\'s being seen as weak. It\'s being dependent. It\'s being disappointed. You would rather overwork than be let down. You would rather withdraw than risk rejection.',
      'Over time this creates: emotional isolation, resentment toward others, difficulty forming deep intimacy, internal pressure no one sees, fatigue from carrying everything alone, a subtle loneliness you don\'t talk about. You appear strong. But sometimes strength feels heavy.',
      'You don\'t need to become dependent. You need to feel safe being supported. There\'s a difference. You don\'t dismantle independence. You update it. Strength doesn\'t have to mean isolation.',
    ],
    regulated:
      'You remain capable. But independence becomes preference \u2014 not armor.\n\nYou can ask for help without feeling exposed. You can receive support without irritation.\n\nYou no longer carry everything alone by default. Autonomy feels grounded. Not defensive.\n\nYou choose strength. You don\'t brace for disappointment.',
  },

  STRATEGIST: {
    coreBelief: 'If I stay ahead, nothing can blindside me.',
    summary:
      'Your nervous system adapted by becoming vigilant. You didn\'t just become responsible \u2014 you became strategic. Scanning for patterns, reading signals, mapping contingencies. Because once, being caught off guard felt unsafe. Now your mind runs scenarios constantly and calls it being thorough.',
    headers: [
      'How This Pattern Usually Forms',
      'What This Identity Protects',
      'Micro-Experiences That Reveal This Pattern',
      'What You Don\'t Say Out Loud',
      'The Story You\'re Telling Yourself',
      'The Hidden Fear',
      'The Cost',
      'What This Means',
    ],
    paragraphs: [
      'This identity often develops in environments where unpredictability carried real cost. Maybe a caregiver\'s mood shifted without warning. Plans changed suddenly and frequently. Financial stability was uncertain. Conflict escalated quickly. You were punished for not anticipating something.\n\nYou may have learned: "You should\'ve known better." "You should\'ve seen that coming." "Why didn\'t you think ahead?"\n\nYour nervous system adapted by becoming vigilant. You didn\'t just become responsible. You became strategic.',
      'It protects against shock. Against embarrassment. Against exposure. Against being unprepared. You don\'t fear effort. You fear surprise. Unpredictability feels destabilizing in your body. Even small changes can trigger tension. So you plan. You calculate. You forecast. You mentally rehearse. Preparation regulates you.',
      'You replay conversations to analyze subtext. You run multiple scenarios before making decisions. You feel unsettled when plans shift last minute. You prefer clarity before committing. You ask a lot of "what if" questions. You feel calmer when you\'ve mapped things out. You struggle when others are impulsive. You don\'t just like planning. Planning lowers your stress.',
      'Internally, you might think: "I just need more information." "If I think it through enough, I\'ll avoid mistakes." "I can\'t afford to look unprepared." "I need to know what I\'m walking into." "If I miss something, it\'s on me." You don\'t say you\'re anxious. You say you\'re thorough.',
      '"I\'m just strategic." "I like being prepared." "I don\'t like chaos." True. But underneath that is this: "If I don\'t anticipate it, it could hurt me." You equate unpredictability with vulnerability.',
      'Your fear isn\'t dependence. It\'s humiliation. It\'s being exposed. It\'s being wrong. It\'s looking foolish. It\'s being blindsided. You would rather overthink than be caught unaware. You would rather delay than misstep.',
      'Over time, this creates: mental fatigue, difficulty relaxing, indecision disguised as thoroughness, strained relationships with more spontaneous people, analysis paralysis, subtle tension that never fully drops. You look composed and intelligent. But internally, you\'re often calculating.',
      'You don\'t need to stop being strategic. You need to feel safe even when you don\'t have all the variables mapped. Control and clarity are strengths. But constant vigilance is exhausting.',
    ],
    regulated:
      'You still plan. But planning becomes useful \u2014 not compulsive.\n\nUncertainty no longer spikes your nervous system. You can make decisions without running every possible scenario.\n\nYou trust yourself even when outcomes aren\'t guaranteed. You think clearly. But you don\'t live in vigilance.\n\nStrategy becomes clarity. Not control.',
  },

  BURNER: {
    coreBelief: 'If I stop, I collapse.',
    summary:
      'Your nervous system learned to endure, not regulate. You sprint, override every signal your body sends, then crash privately. The only time you allow yourself to rest is when your body forces you to. And you\'ve been calling that cycle discipline problems when it\'s actually your nervous system protecting you.',
    headers: [
      'How This Pattern Usually Forms',
      'What This Identity Protects',
      'The Sprint-Crash Cycle',
      'Micro-Experiences That Reveal This Pattern',
      'What You Don\'t Say Out Loud',
      'The Story You\'re Telling Yourself',
      'The Hidden Fear',
      'The Cost',
      'What This Means',
    ],
    paragraphs: [
      'This identity often forms in environments where you had to perform under pressure. Rest was criticized or unsafe. Achievement earned approval. Emotional overwhelm wasn\'t supported. You learned to override exhaustion.\n\nYou may have been the gifted one, the responsible one, the resilient one, the "you\'re so strong" one. But you weren\'t taught how to regulate. You were taught how to endure.\n\nYour system learned a pattern: Push. Override. Finish. Then crash privately.',
      'This identity protects you from falling apart publicly. From being seen as incapable. From losing status, respect, or momentum. So you sprint. You push through fatigue. You ignore your body. You override signals. Because somewhere inside, stopping feels dangerous.',
      'And often \u2014 the only time you finally allow yourself to rest is when your body forces you to. You get sick. You lose your voice. You burn out hard enough that you physically can\'t continue. Illness becomes the only "acceptable" reason to slow down. Because choosing to rest feels like failure. But being forced to rest feels justified.',
      'You work intensely for short periods. You overcommit during motivation spikes. You feel unstoppable during productive waves. You crash hard afterward. You disappear when overwhelmed. You numb out through scrolling, food, TV, or distraction. You feel shame after "wasting time." You restart the cycle with renewed pressure.\n\nSprint, Crash, Regret, Restart. It\'s not inconsistency. It\'s nervous system cycling.',
      'Internally, you might think: "I need to get ahead before I fall behind." "I can\'t slow down right now." "Once I catch up, I\'ll rest." "Why can\'t I just be consistent?" "Something must be wrong with me." You don\'t tell people how chaotic it feels inside. You just restart the engine.',
      '"I work best under pressure." "I just need better discipline." "I thrive in sprints." Sometimes that\'s true. But underneath is this: "If I slow down, I\'ll feel everything." And that feels risky.',
      'Your fear isn\'t failure. It\'s collapse. It\'s exhaustion catching up. It\'s emotions surfacing. It\'s realizing how tired you actually are. So you stay in motion. Because motion keeps you from feeling the drop.',
      'Over time, this creates: inconsistent progress, burnout cycles, self-trust erosion, shame around productivity, difficulty building sustainable success, a sense of being powerful but unstable, a body that eventually rebels. You don\'t feel weak. You feel unreliable to yourself. And that hurts.',
      'You don\'t need more discipline. You need regulation that allows consistency. You don\'t dismantle your drive. You stabilize it. You don\'t stop sprinting. You learn how to move without crashing.',
    ],
    regulated:
      'You still have intensity. But your energy stabilizes.\n\nYou no longer live in sprint-crash cycles. You can pace. You can rest before collapse. You don\'t need illness to justify slowing down.\n\nProductivity becomes consistent. Not frantic.\n\nYour drive becomes sustainable power.',
  },
};

// --- Nervous System Pattern Content ---

export const NS_PATTERN_CONTENT: Record<NervousSystemState, string> = {
  SYMP: 'Your nervous system tends to mobilize under stress. This means when something feels uncertain, pressured, or high-stakes \u2014 your body speeds up.\n\nYou may notice: faster thoughts, tight chest or jaw, shallow breathing, increased urgency, difficulty relaxing, irritation when slowed down, trouble sleeping when something is unresolved.\n\nMobilization isn\'t weakness. It\'s energy. Your body is preparing for action. The problem isn\'t that you activate. It\'s that you may stay activated longer than necessary.\n\nWhen sympathetic becomes your baseline, calm can feel unfamiliar. You may struggle to rest without guilt. Create urgency even when it\'s not required. Feel safer doing than being. Confuse stillness with vulnerability.\n\nYour system learned that movement equals safety. And that once helped you survive. But when activation never fully turns off, your body doesn\'t get to reset.\n\nThe goal isn\'t to eliminate your drive. It\'s to teach your system that safety can exist without constant motion.',

  DORSAL: 'Your nervous system tends to shut down when stress feels overwhelming. Instead of speeding up, your system conserves energy.\n\nYou may notice: low motivation even when things matter, brain fog or difficulty deciding, heavy limbs or physical fatigue, avoidance that feels automatic, wanting to withdraw instead of engage, numbing through scrolling, sleep, food, or distraction, a sense of "what\'s the point?" under pressure.\n\nThis isn\'t laziness. It\'s protection. Dorsal shutdown activates when your system believes effort won\'t change the outcome \u2014 or when stress feels too big to mobilize against. Your body pulls inward to conserve resources.\n\nWhen this becomes your dominant state, you may struggle to start tasks, feel behind even when you\'re capable, experience shame after periods of inactivity, oscillate between pushing hard and disappearing, feel disconnected from your own drive.\n\nYour system learned that sometimes the safest move was to power down. And at one point, that likely kept you safe.\n\nThe goal isn\'t to force motivation. The goal is to gently reintroduce safety and capacity so your system can come back online without overwhelm. You don\'t need more discipline. You need regulation that restores energy without pressure.',

  VENTRAL: 'When your nervous system is ventral regulated, your body feels safe enough. Not perfect. Not euphoric. Not numb. Safe enough.\n\nYou may notice: steady breathing, clear thinking without urgency, flexible focus, the ability to rest without guilt, the ability to act without panic, feeling connected without over-functioning, being able to tolerate uncertainty without spiraling.\n\nIn ventral regulation, you can move between action and rest without crashing. You can work without bracing. Connect without managing. Plan without obsessing. Lead without over-controlling.\n\nYou feel grounded \u2014 not heavy. Alert \u2014 not wired. Calm \u2014 not collapsed. Your system can handle stress without flipping into survival.\n\nYou still experience emotion. You still experience ambition. You still care. But your body no longer interprets everything as threat.\n\nRegulation doesn\'t mean you stop being driven. It means your drive is no longer powered by fear.\n\nThis is the baseline we build toward. Not perfection. Capacity.',
};

// --- Combination Content ---

export const COMBINATION_CONTENT: Record<CombinationKey, string> = {
  ACHIEVER_SYMP:
    'You don\'t just work hard \u2014 your body equates momentum with safety.\n\nWhen things slow down, you don\'t feel relaxed. You feel exposed. Your nervous system interprets stillness as vulnerability, so you stay moving \u2014 solving, producing, optimizing. Even rest becomes another task to complete correctly.\n\nPressure feels familiar. Urgency feels stabilizing. Calm can actually feel uncomfortable.\n\nFrom the outside, you look driven and composed. Internally, you\'re managing a low-grade current of tension that rarely turns off.\n\nYou don\'t burn out because you\'re weak. You burn out because your body doesn\'t believe it\'s allowed to power down.',

  ACHIEVER_DORSAL:
    'You carry responsibility intensely \u2014 until your system pulls the emergency brake.\n\nOn the surface, you\'re capable and high-functioning. But when pressure builds past a certain point, your body doesn\'t push harder \u2014 it collapses.\n\nYou may call it procrastination. You may call it "needing a break." But it often feels like a sudden drop in energy, clarity, or motivation.\n\nYou oscillate between overdrive and shutdown. This isn\'t laziness. It\'s overload.\n\nYour system learned to survive by stepping up. But when stepping up becomes too much, it protects you the only other way it knows how \u2014 by disconnecting.\n\nYou\'re not inconsistent. You\'re swinging between two survival states.',

  ANCHOR_SYMP:
    'You don\'t just care about connection \u2014 your body reacts quickly when it feels unstable.\n\nWhen someone\'s tone shifts, pulls away, or seems off, your nervous system activates. Your chest tightens. Your thoughts speed up. You feel an urgency to fix, clarify, smooth, or reestablish closeness.\n\nYou might send the extra text. Over-explain. Apologize quickly. Try to resolve things immediately.\n\nDistance doesn\'t feel neutral to you. It feels threatening.\n\nFrom the outside, you look attentive and emotionally intelligent. Inside, your system is trying to prevent rupture before it happens.\n\nYou\'re not "too sensitive." Your nervous system just learned that connection required fast response.',

  ANCHOR_DORSAL:
    'You care deeply about connection \u2014 but when tension builds past a certain point, your system pulls inward.\n\nInstead of chasing reassurance, you go quiet. You minimize your needs. You tell yourself it\'s not a big deal.\n\nBut internally, you feel heavy. Small. Uncertain. You may withdraw emotionally while still appearing agreeable on the surface.\n\nRather than fight for connection, you shrink to preserve it.\n\nIt\'s not indifference. It\'s protection. Your system learned that sometimes the safest way to stay connected was to become less visible.\n\nYou\'re not cold. You\'re bracing.',

  OPERATOR_SYMP:
    'You don\'t just handle things alone \u2014 you stay ahead of needing anyone.\n\nWhen pressure rises, your body shifts into action mode. You move faster. You think faster. You tighten up internally and become more decisive.\n\nIf someone offers help, it can feel intrusive or inefficient. You may take over, correct them, or quietly redo their work.\n\nYour independence becomes sharper under stress. Instead of leaning, you accelerate.\n\nIt\'s not that you don\'t want support \u2014 it\'s that urgency feels safer than reliance.\n\nControl regulates you. Speed stabilizes you. Competence keeps you from feeling exposed.\n\nFrom the outside, you look composed and capable. Inside, your nervous system is bracing.',

  OPERATOR_DORSAL:
    'You don\'t just handle things alone \u2014 you disappear when it feels like too much.\n\nWhen stress builds past your tolerance, you don\'t ask for help. You withdraw. You may delay responding. Minimize your feelings. Tell yourself it\'s not a big deal.\n\nYou shut down emotionally before you risk being let down.\n\nOn the surface, it can look like distance or indifference. Internally, it feels like self-protection.\n\nRather than reach for support, your system pulls inward.\n\nYou would rather carry it quietly than expose a need.\n\nIt\'s not coldness. It\'s armor.',

  STRATEGIST_SYMP:
    'When stress rises, your mind accelerates.\n\nYou start running scenarios faster. You gather more information. You double-check. You tighten your timelines.\n\nYour body feels alert \u2014 maybe wired. Sleep gets lighter. Your thoughts loop harder.\n\nYou may talk more, research more, text more, clarify more. You\'re not panicking. You\'re trying to regain control through precision.\n\nUncertainty feels urgent. You want answers now. You want clarity now. Preparation becomes intensified.\n\nFrom the outside, you look focused and productive. Inside, your nervous system is in overdrive.\n\nYou don\'t feel chaotic. You feel vigilant.',

  STRATEGIST_DORSAL:
    'When stress passes a certain threshold, your thinking doesn\'t speed up \u2014 it stalls.\n\nYou may feel foggy. Overwhelmed by options. Stuck in indecision.\n\nYou still want clarity. But now your mind feels heavy instead of sharp.\n\nPlans feel exhausting. Choices feel high stakes. You may delay action because "it\'s not fully thought through."\n\nInstead of active strategizing, you fall into over-analysis without movement. You might scroll. Avoid. Withdraw. Tell yourself you need more time.\n\nIt\'s not laziness. It\'s overload.\n\nYour system moves from hyper-calculating to low-energy paralysis.\n\nYou don\'t feel urgent. You feel stuck.',

  BURNER_SYMP:
    'Your baseline isn\'t calm \u2014 it\'s charged. You live in forward motion.\n\nWhen pressure rises, your body responds with urgency. You push harder. Work longer. Move faster. You override hunger, fatigue, and emotional signals.\n\nYou feel most alive when you\'re in momentum. Slowing down creates anxiety. Stillness feels like falling behind.\n\nYour crashes don\'t come from laziness. They come from running your nervous system at full throttle for too long.\n\nYou burn bright. Then your body forces the shutdown. You don\'t stop because you choose to. You stop because you hit the wall.\n\nYour system isn\'t weak. It just doesn\'t know how to idle.',

  BURNER_DORSAL:
    'Your baseline isn\'t energized \u2014 it\'s heavy. You don\'t start in overdrive. You start in low fuel.\n\nProductivity comes in bursts because you\'re pushing against an underlying exhaustion.\n\nWhen stress builds, you don\'t accelerate. You disappear. You scroll. You avoid. You sleep. You mentally check out.\n\nThen shame kicks in. And that shame creates a short, intense surge of productivity \u2014 just enough to catch up \u2014 before you drop again.\n\nYou don\'t crash because you overworked. You overwork because you\'re trying to outrun the shutdown.\n\nYour system learned early that when things felt overwhelming, disconnecting was safest. So now even normal stress can trigger the drop.\n\nIt\'s not laziness. It\'s protection.',
};

// --- Meditation Content ---

export const MEDITATION_CONTENT: Record<CombinationKey, MeditationRecommendation> = {
  ACHIEVER_SYMP: {
    title: 'Safe Even When You Slow Down',
    body: 'If this is you, slowing down doesn\'t feel peaceful. It feels exposed.\n\nWhen momentum drops, something in your body tightens. You start scanning. You look for the next task. You create movement \u2014 because movement feels stabilizing.\n\nThis guided hypnotherapy session is designed to help you: experience stillness without feeling vulnerable, separate productivity from survival, let your body power down without triggering urgency, feel steady even when nothing is being accomplished.\n\nYou won\'t lose your ambition. You\'ll just stop using it to feel safe.',
  },

  ACHIEVER_DORSAL: {
    title: 'Consistent Power Without Collapse',
    body: 'If this is you, you don\'t just work hard. You swing.\n\nYou step up intensely. You carry everything. Then suddenly your energy drops. Focus disappears. Motivation vanishes. And the shame starts.\n\nThis guided hypnotherapy session is designed to help you: break the overdrive-to-shutdown cycle, feel pressure without tipping into collapse, build steady output instead of survival bursts, experience productivity without needing to crash afterward.\n\nYou won\'t become less capable. You\'ll become sustainable.',
  },

  ANCHOR_SYMP: {
    title: 'Connection Without Chase',
    body: 'If this is you, when someone shifts \u2014 even slightly \u2014 your body reacts fast.\n\nYou feel it in your chest. Your thoughts start moving. You want to fix it. Clarify it. Smooth it over.\n\nThis guided hypnotherapy session is designed to help you: feel safe when connection isn\'t instantly secure, slow the urgency to fix before rupture even happens, separate someone\'s mood from your responsibility, experience closeness without chasing it.\n\nYou won\'t lose your empathy. You\'ll just stop using it to prevent abandonment.',
  },

  ANCHOR_DORSAL: {
    title: 'Visible and Still Safe',
    body: 'If this is you, when tension builds, you don\'t chase. You shrink.\n\nYou minimize your needs. You tell yourself it\'s fine. You stay agreeable. But inside, you feel small.\n\nThis guided hypnotherapy session is designed to help you: feel safe expressing your needs without fearing loss, stay present in your body instead of shrinking, experience connection without self-erasure, reclaim visibility without triggering withdrawal.\n\nYou won\'t become demanding. You\'ll become grounded.',
  },

  OPERATOR_SYMP: {
    title: 'Strength Without Armor',
    body: 'If this is you, when pressure rises, you don\'t freeze. You tighten. You move. You take over.\n\nYou handle it before anyone can disappoint you. On the outside, you look solid. Inside, your body is bracing.\n\nThis guided hypnotherapy session is designed to help you: feel safe enough to slow down without losing control, experience support without irritation or urgency, loosen the internal grip that keeps you in overdrive, separate true strength from defensive independence.\n\nPower won\'t disappear. It will just stop costing you connection.',
  },

  OPERATOR_DORSAL: {
    title: 'Safe to Reach',
    body: 'If this is you, when things feel overwhelming, you don\'t push harder. You go quiet.\n\nYou minimize. You withdraw. You tell yourself it\'s fine. You would rather disappear than risk needing someone.\n\nThis guided hypnotherapy session is designed to help you: gently lower the armor around asking for support, feel safe staying present instead of shutting down, reconnect to your needs without feeling exposed, experience strength that includes connection.\n\nAutonomy will remain. But it won\'t feel defensive.',
  },

  STRATEGIST_SYMP: {
    title: 'Calm Clarity',
    body: 'If this is you, your mind doesn\'t shut down under stress \u2014 it speeds up.\n\nYou research more. Think harder. Double-check everything. Try to eliminate uncertainty before it can hurt you.\n\nThis guided hypnotherapy session is designed to help you: slow mental overdrive without losing sharpness, reduce the urgency around needing answers immediately, feel steady even when outcomes aren\'t guaranteed, make decisions without running every possible scenario first.\n\nStrategy won\'t disappear. It will just stop running your nervous system.',
  },

  STRATEGIST_DORSAL: {
    title: 'From Stuck to Steady',
    body: 'If this is you, your mind doesn\'t race under stress \u2014 it stalls.\n\nYou want clarity. But instead, you feel foggy. Overwhelmed by options. Unable to choose.\n\nThis guided hypnotherapy session is designed to help you: break the over-analysis paralysis cycle, reconnect to steady decision-making, reduce the heaviness that comes with overwhelm, take action without needing perfect certainty.\n\nClarity won\'t come from thinking harder. It will come from feeling stable enough to choose.',
  },

  BURNER_SYMP: {
    title: 'Sustainable Power',
    body: 'If this is you, you don\'t need more motivation. You need a nervous system that knows how to slow down without panicking.\n\nThis guided hypnotherapy session is designed to help you: stop mistaking urgency for progress, feel safe easing off the gas, catch yourself before the crash instead of after, build momentum that doesn\'t cost your body.\n\nThis isn\'t about dulling your intensity. It\'s about stabilizing it.',
  },

  BURNER_DORSAL: {
    title: 'Steady Energy Return',
    body: 'If this is you, you\'re not lazy. Your body learned to shut down when things felt overwhelming \u2014 and now it does it automatically.\n\nThis guided hypnotherapy session is designed to help you: gently reconnect with your energy without forcing it, break the numb-to-panic-to-push-to-shutdown cycle, reduce the shame that fuels the crash, build small, steady momentum instead of emergency bursts.\n\nThe goal isn\'t to hustle harder. It\'s to create energy that doesn\'t disappear the moment pressure rises.',
  },
};

// --- Nervous System Tools Content ---

export const NS_TOOLS_CONTENT: Record<NervousSystemState, string> = {
  SYMP: 'Your system is running hot. You need tools that bring your body back down \u2014 not by forcing calm, but by signaling safety.\n\nWhat helps: slowing your exhale longer than your inhale, grounding touch (feet on floor, hands on chest), softening your jaw and shoulders intentionally, reducing urgency by naming what\'s actually happening right now.\n\nInside The Rewire Room, you\'ll find step-by-step regulation guides, breathwork, and somatic practices designed specifically for a system that runs in overdrive.',

  DORSAL: 'Your system is conserving energy. You don\'t need to be pushed \u2014 you need gentle re-engagement.\n\nWhat helps: small movements (rocking, swaying, walking slowly), warm temperature on your body, orienting to your environment (name 5 things you see), humming or toning to activate your vagus nerve.\n\nInside The Rewire Room, you\'ll find guided practices that gently bring your system back online \u2014 without overwhelm, without pressure, without shame.',

  VENTRAL: 'Your system has capacity. You\'re not in survival \u2014 you\'re in a place where growth can stick.\n\nWhat helps: deepening your regulation through consistency, building resilience so stress doesn\'t knock you out of window, using your regulated state to practice new patterns.\n\nInside The Rewire Room, you\'ll find tools that help you maintain and expand this baseline \u2014 so regulation becomes your default, not something you have to fight for.',
};

// --- Community Value Stack ---

export const communityValueStack = [
  {
    title: 'Guided Somatic Hypnotherapy Sessions',
    description:
      'Matched to your exact identity \u00d7 nervous system pattern \u2014 not generic advice, but sessions designed for how YOUR system operates.',
  },
  {
    title: 'Monthly Live Integration Calls',
    description:
      'Real-time nervous system work with guidance. Not just learning \u2014 practicing regulation with support.',
  },
  {
    title: 'Private Community',
    description:
      'High-functioning humans doing the same work. No toxic positivity. Just honest, body-based growth.',
  },
  {
    title: 'Regulation Tools Library',
    description:
      'Breathwork, somatic practices, and state-specific exercises for sympathetic, dorsal, and ventral states.',
  },
  {
    title: 'Identity Pattern Deep Dives',
    description:
      'Go deeper than this assessment. Understand exactly how your survival identity formed and how to interrupt it.',
  },
  {
    title: 'DM Access to Your Guide',
    description:
      'Direct message access means your questions get answered, your blocks get seen, and your progress gets guided.',
  },
];

// --- Personalized CTA Content ---

export interface PersonalizedCTA {
  headline: string;
  subline: string;
  buttonText: string;
  urgencyLine: string;
}

export const personalizedCTA: Record<IdentityType, PersonalizedCTA> = {
  ACHIEVER: {
    headline: 'You\'ve spent your whole life building for everyone else. This is the one thing you build for yourself.',
    subline: 'Your nervous system profile is a starting point. Inside the community, you\'ll get the specific tools, meditations, and support to move from survival-driven productivity to aligned, regulated living.',
    buttonText: 'Start My Healing Protocol',
    urgencyLine: 'Your nervous system already told us what it needs. The question is whether you\'ll listen.',
  },
  ANCHOR: {
    headline: 'You\'ve held everyone else together. It\'s time someone held space for you.',
    subline: 'Your nervous system profile shows exactly how your caretaking patterns formed. Inside the community, you\'ll learn to care without carrying — and finally receive the support you\'ve been giving everyone else.',
    buttonText: 'Start My Healing Protocol',
    urgencyLine: 'The people who need you most need you regulated. That starts with you choosing yourself.',
  },
  OPERATOR: {
    headline: 'You don\'t need to do this alone. That\'s your survival identity talking.',
    subline: 'Your Operator identity made self-reliance feel like strength. Inside the community, you\'ll discover that real strength includes letting people in — on your terms, at your pace.',
    buttonText: 'Start My Healing Protocol',
    urgencyLine: 'You won\'t have to perform vulnerability. We meet you where you are.',
  },
  STRATEGIST: {
    headline: 'You\'ve mapped the problem perfectly. Now let us help you move through it.',
    subline: 'Your Strategist mind has already analyzed this assessment. Inside the community, you\'ll get the embodied practices that bridge the gap between understanding and transformation.',
    buttonText: 'Start My Healing Protocol',
    urgencyLine: 'Knowing isn\'t healing. Your nervous system needs experience, not just information.',
  },
  BURNER: {
    headline: 'This doesn\'t require a sprint. It requires a system that meets you where you are.',
    subline: 'Your Burner pattern means you\'ve started things before and crashed. The community is designed for sustainable engagement — no pressure to perform, no shame about the pace.',
    buttonText: 'Start My Healing Protocol',
    urgencyLine: 'The crash-and-burn cycle ends when you build something designed for your nervous system.',
  },
};

// --- Locked Content Teaser (Open Loop) ---

export const lockedContentTeaser: Record<IdentityType, string[]> = {
  ACHIEVER: [
    'Your custom Achiever Regulation Protocol — daily practices designed for your pattern',
    'The "Worth Without Output" rewiring sequence',
    'Guided hypnotherapy: "Safe Even When You Slow Down"',
    'Live regulation sessions with other Achievers',
    'Monthly identity-specific workshops',
  ],
  ANCHOR: [
    'Your custom Anchor Regulation Protocol — daily practices designed for your pattern',
    'The "Boundaries Without Guilt" rewiring sequence',
    'Guided hypnotherapy: "Visible and Still Safe"',
    'Live regulation sessions with other Anchors',
    'Monthly identity-specific workshops',
  ],
  OPERATOR: [
    'Your custom Operator Regulation Protocol — daily practices designed for your pattern',
    'The "Safe Enough to Need" rewiring sequence',
    'Guided hypnotherapy: "Safe to Reach"',
    'Live regulation sessions with other Operators',
    'Monthly identity-specific workshops',
  ],
  STRATEGIST: [
    'Your custom Strategist Regulation Protocol — daily practices designed for your pattern',
    'The "Trust Without Certainty" rewiring sequence',
    'Guided hypnotherapy: "Calm Clarity"',
    'Live regulation sessions with other Strategists',
    'Monthly identity-specific workshops',
  ],
  BURNER: [
    'Your custom Burner Regulation Protocol — daily practices designed for your pattern',
    'The "Sustain Without Sprinting" rewiring sequence',
    'Guided hypnotherapy: "Sustainable Power"',
    'Live regulation sessions with other Burners',
    'Monthly identity-specific workshops',
  ],
};

// --- Social Proof Content ---

export const socialProofData = {
  memberCount: '200+',
  tagline: 'people already healing their nervous system inside the community',
  testimonials: [
    {
      quote:
        'I finally understand why I could never just relax. My body wasn\'t broken \u2014 it was protecting me. The practices in here actually changed how my nervous system responds.',
      name: 'Member',
      pattern: 'Achiever',
    },
    {
      quote:
        'I thought I was lazy my whole life. Turns out my system was in dorsal shutdown. Three weeks of the somatic work in here and I felt something shift that years of therapy hadn\'t touched.',
      name: 'Member',
      pattern: 'Burner',
    },
    {
      quote:
        'I didn\'t even know I was managing everyone\'s emotions until this assessment. Now I catch it in real time. The community gave me the tools AND the support to actually stop the pattern.',
      name: 'Member',
      pattern: 'Anchor',
    },
  ],
};
