import { AvatarConfig, Badge, Lesson, DailyMission, ShopItem, AdventureNode, LeaderboardEntry, QuizQuestion } from '../types';

export const INITIAL_AVATAR: AvatarConfig = {
  name: 'Alex Explorer',
  skinTone: '#F3C59D',
  hairStyle: 'space-fade',
  hairColor: '#2B2B2B',
  outfit: 'lab-coat',
  accessory: 'glasses',
  background: 'quantum-lab',
  level: 3,
  xp: 450,
  coins: 280,
  streakDays: 7,
  unlockedBadges: ['quiz-master', 'streak-7', 'science-explorer'],
  unlockedOutfits: ['lab-coat', 'varsity'],
  unlockedBackgrounds: ['quantum-lab', 'cosmos'],
  unlockedAccessories: ['glasses', 'none'],
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    icon: '🧠',
    description: 'Scored 100% on an AI STEM Quiz without revealing final answers early.',
    unlocked: true,
    unlockedAt: 'Yesterday',
    color: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'streak-7',
    name: '7-Day Learning Streak',
    icon: '🔥',
    description: 'Maintained an unbroken daily learning streak for 7 consecutive days.',
    unlocked: true,
    unlockedAt: 'Today',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    icon: '📚',
    description: 'Explored and completed 5+ in-depth AI lesson explanations.',
    unlocked: false,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'fast-learner',
    name: 'Fast Learner',
    icon: '⚡',
    description: 'Solved a complex STEM problem in under 3 minutes using progressive hints.',
    unlocked: false,
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'science-explorer',
    name: 'Science Explorer',
    icon: '🧪',
    description: 'Performed simulated virtual experiments across Physics, Chemistry, Maths, and Biology.',
    unlocked: true,
    unlockedAt: '2 days ago',
    color: 'from-emerald-400 to-teal-600',
  },
];

export const INITIAL_MISSIONS: DailyMission[] = [
  {
    id: 'mission-math',
    title: 'Complete 1 Maths Lesson or Graph Lab',
    progress: 1,
    target: 1,
    xpReward: 35,
    completed: true,
    icon: '📐',
  },
  {
    id: 'mission-science',
    title: 'Answer 5 Science Questions in Challenge Mode',
    progress: 3,
    target: 5,
    xpReward: 50,
    completed: false,
    icon: '🧪',
  },
  {
    id: 'mission-experiment',
    title: 'Run 1 Virtual Experiment (Physics or Chemistry)',
    progress: 1,
    target: 1,
    xpReward: 40,
    completed: true,
    icon: '🔬',
  },
  {
    id: 'mission-streak',
    title: 'Keep Daily Learning Streak Active',
    progress: 1,
    target: 1,
    xpReward: 25,
    completed: true,
    icon: '🔥',
  },
];

export const ADVENTURE_NODES: AdventureNode[] = [
  {
    id: 'ch1-m1',
    chapter: 1,
    title: "Mission 1: Newton's Laws & Inertia",
    subtitle: 'Understand forces, vectors, and frictionless surfaces.',
    type: 'lesson',
    completed: true,
    locked: false,
    xp: 50,
    icon: '🚀',
    subject: 'Physics',
  },
  {
    id: 'ch1-m2',
    chapter: 1,
    title: 'Mission 2: Gravity & Pendulum Lab',
    subtitle: 'Simulate swinging bobs across Earth, Mars, and the Moon.',
    type: 'lab',
    completed: true,
    locked: false,
    xp: 60,
    icon: '⏱️',
    subject: 'Physics',
  },
  {
    id: 'ch1-boss',
    chapter: 1,
    title: 'Chapter 1 Boss Quiz: Mechanics Master',
    subtitle: 'Defeat the 5-question Newton challenge without hints!',
    type: 'boss',
    completed: false,
    locked: false,
    xp: 150,
    icon: '👑',
    subject: 'Physics',
  },
  {
    id: 'ch2-m1',
    chapter: 2,
    title: 'Mission 3: Atoms & The Octet Rule',
    subtitle: 'How electrons determine chemical bonding and stability.',
    type: 'lesson',
    completed: false,
    locked: false,
    xp: 60,
    icon: '⚛️',
    subject: 'Chemistry',
  },
  {
    id: 'ch2-m2',
    chapter: 2,
    title: 'Mission 4: Molecule Builder Lab',
    subtitle: 'Construct H2O, Methane, and Salt in the 3D builder.',
    type: 'lab',
    completed: false,
    locked: true,
    xp: 75,
    icon: '🧪',
    subject: 'Chemistry',
  },
  {
    id: 'ch2-boss',
    chapter: 2,
    title: 'Chapter 2 Boss Quiz: Molecular Architect',
    subtitle: 'Master covalent vs ionic bonding with high accuracy.',
    type: 'boss',
    completed: false,
    locked: true,
    xp: 180,
    icon: '🏰',
    subject: 'Chemistry',
  },
  {
    id: 'ch3-m1',
    chapter: 3,
    title: 'Mission 5: The Human Circulatory Machine',
    subtitle: 'Explore chambers, valves, and blood oxygenation.',
    type: 'lab',
    completed: false,
    locked: true,
    xp: 80,
    icon: '🫀',
    subject: 'Biology',
  },
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'outfit-space-suit',
    name: 'Astronaut EVA Suit',
    category: 'outfit',
    value: 'space-suit',
    cost: 150,
    icon: '🧑‍🚀',
    description: 'Hermetically sealed spacesuit designed for deep cosmos exploration.',
    rarity: 'Epic',
  },
  {
    id: 'outfit-cyber-hoodie',
    name: 'Quantum Cyber Hoodie',
    category: 'outfit',
    value: 'cyber-hoodie',
    cost: 120,
    icon: '🧥',
    description: 'Neon glowing synthetic fiber with thermal regulation.',
    rarity: 'Rare',
  },
  {
    id: 'outfit-scholar-robe',
    name: 'Alchemist Scholar Robe',
    category: 'outfit',
    value: 'scholar-robe',
    cost: 200,
    icon: '🧙‍♂️',
    description: 'Ancient velvet robe inscribed with golden mathematical constants.',
    rarity: 'Legendary',
  },
  {
    id: 'acc-vr-headset',
    name: 'Holo-Lab VR Visor',
    category: 'accessory',
    value: 'vr-headset',
    cost: 110,
    icon: '🥽',
    description: 'Heads-up display showing real-time molecular orbital vectors.',
    rarity: 'Rare',
  },
  {
    id: 'acc-space-helmet',
    name: 'Titanium Bubble Helmet',
    category: 'accessory',
    value: 'space-helmet',
    cost: 160,
    icon: '🪖',
    description: 'Gold-tinted radiation visor with oxygen telemetry.',
    rarity: 'Epic',
  },
  {
    id: 'acc-drone-pet',
    name: 'AI Companion Drone',
    category: 'accessory',
    value: 'drone-pet',
    cost: 250,
    icon: '🛸',
    description: 'A miniature floating robotic orb that chirps encouraging tips.',
    rarity: 'Legendary',
  },
  {
    id: 'bg-observatory',
    name: 'Mauna Kea Observatory',
    category: 'background',
    value: 'observatory',
    cost: 100,
    icon: '🔭',
    description: 'Night sky backdrop filled with nebulae and radio telescope arrays.',
    rarity: 'Rare',
  },
  {
    id: 'bg-bio-dome',
    name: 'Martian Bio-Dome',
    category: 'background',
    value: 'bio-dome',
    cost: 140,
    icon: '🌿',
    description: 'Hydroponic green laboratory inside a Martian crater dome.',
    rarity: 'Epic',
  },
  {
    id: 'bg-cyber-campus',
    name: 'Neo-Tokyo Campus',
    category: 'background',
    value: 'cyber-campus',
    cost: 180,
    icon: '🌆',
    description: 'Floating university courtyard under neon city lights.',
    rarity: 'Legendary',
  },
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'u-1',
    name: 'Sophia Chen',
    avatarOutfit: 'space-suit',
    avatarBg: 'cosmos',
    level: 7,
    xp: 1420,
    streak: 15,
    badgesCount: 5,
  },
  {
    id: 'u-2',
    name: 'Marcus Vance',
    avatarOutfit: 'lab-coat',
    avatarBg: 'quantum-lab',
    level: 5,
    xp: 980,
    streak: 11,
    badgesCount: 4,
  },
  {
    id: 'u-current',
    name: 'Alex Explorer (You)',
    avatarOutfit: 'lab-coat',
    avatarBg: 'quantum-lab',
    level: 3,
    xp: 450,
    streak: 7,
    badgesCount: 3,
    isCurrentUser: true,
  },
  {
    id: 'u-3',
    name: 'Priya Sharma',
    avatarOutfit: 'cyber-hoodie',
    avatarBg: 'cyber-campus',
    level: 3,
    xp: 420,
    streak: 6,
    badgesCount: 3,
  },
  {
    id: 'u-4',
    name: 'Liam O’Connor',
    avatarOutfit: 'varsity',
    avatarBg: 'observatory',
    level: 2,
    xp: 290,
    streak: 4,
    badgesCount: 2,
  },
];

export const CURATED_LESSONS: Lesson[] = [
  {
    id: 'phys-pendulum',
    title: 'Simple Harmonic Motion & The Pendulum',
    subject: 'Physics',
    difficulty: 'Intermediate',
    summary: 'Discover how gravity and string length govern oscillations, and why mass surprisingly does not matter.',
    icon: '⏱️',
    relatedLab: 'physics',
    sampleQuestion: 'A grandfather clock pendulum has a length of 0.994 meters on Earth (g = 9.8 m/s²). What is its period T of oscillation?',
    contentMarkdown: `# 🎯 Simple Harmonic Motion & The Pendulum
## 💡 The Real-World Intuition
Imagine pushing a friend on a playground swing. Whether they weigh 40 kg or 80 kg, the time it takes for one complete back-and-forth swing is practically identical! This astonishing fact was first timed by Galileo Galilei watching a swinging chandelier in the Pisa Cathedral using his own pulse.

## 🔬 Core Mechanics & Governing Equations
For small angular displacements ($\\theta < 15^\\circ$ or $0.26$ radians), restoring force is directly proportional to displacement:
$$F = -mg \\sin(\\theta) \\approx -mg\\frac{x}{L}$$

The natural angular frequency $\\omega$ and period $T$ are:
$$T = 2\\pi \\sqrt{\\frac{L}{g}}$$

### Key Insights:
1. **Length Dominance**: Quadrupling string length $L$ doubles the period $T$.
2. **Gravity Sensitivity**: If taken to the Moon where $g_{moon} \\approx 1.62\\text{ m/s}^2$, the pendulum swings more than twice as slowly!
3. **Mass Independence**: The restoring force scales with mass $m$, but so does the inertial resistance to acceleration ($F = ma$). They cancel out cleanly.

## 🧪 Virtual Lab Activity
Head over to the **Physics Virtual Lab** to adjust string length $L$, switch gravity to Mars or the Moon, and watch the real-time kinetic and potential energy transfer!

## ⚠️ The #1 Misconception
Many students believe pulling the pendulum further back will increase the time it takes to swing. In reality, greater amplitude creates a steeper restoring gravity force, which accelerates the bob faster — balancing the extra distance perfectly (isochronism)!`,
  },
  {
    id: 'chem-bonding',
    title: 'Covalent & Ionic Bonding: How Molecules Form',
    subject: 'Chemistry',
    difficulty: 'Beginner',
    summary: 'Master valence electrons, electronegativity differences, and octet stability in water, methane, and salts.',
    icon: '🧪',
    relatedLab: 'chemistry',
    sampleQuestion: 'Why does Carbon form 4 covalent bonds in Methane (CH₄) instead of 2, and what geometry does it adopt?',
    contentMarkdown: `# 🎯 Covalent & Ionic Chemical Bonding
## 💡 The Real-World Intuition
Atoms are like puzzle pieces striving for contentment. A noble gas like Neon or Argon is completely satisfied with 8 outer valence electrons (the octet rule). Other atoms will share, steal, or donate valence electrons until they achieve this stable octet.

## 🔬 Core Mechanics
### 1. Covalent Bonds (Sharing)
When two non-metals have similar electronegativities, they share electron pairs:
- **Single Bond**: Shares 2 electrons (e.g. $H-H$, $H-Cl$)
- **Double Bond**: Shares 4 electrons (e.g. $O=C=O$)
- **Triple Bond**: Shares 6 electrons (e.g. $N\\equiv N$)

### 2. Ionic Bonds (Electron Transfer)
When electronegativity difference is large ($\\Delta EN > 1.7$):
$$\\text{Na} ([\\text{Ne}] 3s^1) + \\text{Cl} ([\\text{Ne}] 3s^2 3p^5) \\rightarrow \\text{Na}^+ + \\text{Cl}^-$$
Electrostatic Coulomb forces bind them into an interlocking crystalline lattice.

## 🧪 Molecule Builder Sandbox
Visit our **Chemistry Molecule Builder** to snap Hydrogen, Carbon, Nitrogen, and Oxygen atoms together, test bond limits, and check valence stability!`,
  },
  {
    id: 'math-parabolas',
    title: 'Quadratic Functions & Parabolic Trajectories',
    subject: 'Maths',
    difficulty: 'Intermediate',
    summary: 'Explore vertex form, quadratic roots, discriminant nature, and real-world ballistic arcs.',
    icon: '📐',
    relatedLab: 'maths',
    sampleQuestion: 'Given f(x) = -x² + 4x + 5, find the vertex coordinates, axis of symmetry, and x-intercepts.',
    contentMarkdown: `# 🎯 Quadratic Functions & Graph Manipulation
## 💡 The Real-World Intuition
Every basketball shot arching toward a hoop, every suspension bridge cable, and every flashlight reflector follows a parabola. It represents constant acceleration under gravity!

## 🔬 Core Mechanics
A quadratic function in standard form:
$$f(x) = ax^2 + bx + c$$
Or in vertex form:
$$f(x) = a(x - h)^2 + k$$
Where the vertex $(h, k)$ is:
$$h = -\\frac{b}{2a}, \\quad k = f(h)$$

### The Discriminant $\\Delta = b^2 - 4ac$:
- $\\Delta > 0$: Two distinct real roots (crosses x-axis twice).
- $\\Delta = 0$: Exactly one real double root (tangent to x-axis at vertex).
- $\\Delta < 0$: No real roots (floats entirely above or below x-axis).

## 🧪 Graph Manipulation Sandbox
Open the **Maths Graph Lab** to drag $a$, $b$, and $c$ sliders, watch the parabola open, reflect, and compute real-time tangents!`,
  },
  {
    id: 'bio-cardio',
    title: 'The Human Heart & Dual Circulatory System',
    subject: 'Biology',
    difficulty: 'Intermediate',
    summary: 'Step inside the 4-chambered pump, understand pulmonary vs systemic circuits, and oxygenation mechanics.',
    icon: '🫀',
    relatedLab: 'biology',
    sampleQuestion: 'Trace the path of an erythrocyte from the right atrium to the aorta, listing valves and chambers in sequence.',
    contentMarkdown: `# 🎯 The Human Heart & Dual Circulation
## 💡 The Real-World Intuition
Your heart is a dual-piston biological hydraulic engine that beats ~100,000 times a day without stopping for maintenance. It operates two separate circulatory systems simultaneously: one to re-fuel oxygen at the lungs, and one to deliver that oxygen to every organ in your body.

## 🔬 Anatomical Pathway
1. **Right Atrium**: Receives deoxygenated blood from the body via Superior & Inferior Vena Cava.
2. **Tricuspid Valve**: Directs blood into the **Right Ventricle**.
3. **Pulmonary Valve & Artery**: Pushes blood to the lungs for alveolar gas exchange ($O_2 \\leftrightarrow CO_2$).
4. **Left Atrium**: Receives freshly oxygenated blood from pulmonary veins.
5. **Mitral (Bicuspid) Valve**: Passes blood into the powerful muscular **Left Ventricle**.
6. **Aortic Valve & Aorta**: Generates systolic pressure (~120 mmHg) to nourish brain, organs, and extremities!

## 🧪 Virtual Human Body Explorer
Click the **Biology Lab** to inspect the 3D-styled heart, lungs, brain, and liver, and view interactive vital indicators!`,
  },
];

export const SAMPLE_PHOTO_QUESTIONS = [
  {
    title: 'Physics: Incline Plane & Friction Problem',
    tag: 'Mechanics',
    questionText: 'A 5 kg block slides down a 30° rough incline with coefficient of kinetic friction μk = 0.2. What is its acceleration down the ramp?',
    svgPreview: `<svg viewBox="0 0 200 120" class="w-full h-full bg-slate-900 rounded p-2">
      <polygon points="20,100 180,100 180,20" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <rect x="75" y="42" width="28" height="20" transform="rotate(-30 75 42)" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      <path d="M 50,100 A 30 30 0 0 0 60,95" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <text x="65" y="93" fill="#f59e0b" font-size="10" font-family="sans-serif">30°</text>
      <text x="75" y="32" fill="#e2e8f0" font-size="10" font-family="sans-serif">m = 5kg</text>
      <text x="110" y="112" fill="#94a3b8" font-size="8" font-family="sans-serif">μk = 0.2</text>
    </svg>`,
  },
  {
    title: 'Maths: Definite Integral & Area Problem',
    tag: 'Calculus',
    questionText: 'Evaluate the definite integral ∫ from 0 to π of (x · sin(x)) dx using integration by parts.',
    svgPreview: `<svg viewBox="0 0 200 120" class="w-full h-full bg-slate-900 rounded p-2">
      <line x1="20" y1="90" x2="180" y2="90" stroke="#64748b" stroke-width="1.5"/>
      <line x1="40" y1="20" x2="40" y2="105" stroke="#64748b" stroke-width="1.5"/>
      <path d="M 40,90 Q 95,20 150,90" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="45" y="40" fill="#f43f5e" font-size="14" font-family="monospace">∫₀^π x·sin(x) dx</text>
      <text x="145" y="105" fill="#e2e8f0" font-size="10" font-family="sans-serif">x = π</text>
    </svg>`,
  },
  {
    title: 'Chemistry: Equilibrium Constant Kc',
    tag: 'Chemical Equilibrium',
    questionText: 'For N2(g) + 3H2(g) ⇌ 2NH3(g), initial concentrations are [N2]=0.5 M, [H2]=1.2 M. At equilibrium [NH3]=0.4 M. Calculate Kc.',
    svgPreview: `<svg viewBox="0 0 200 120" class="w-full h-full bg-slate-900 rounded p-2">
      <rect x="25" y="25" width="150" height="70" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
      <text x="35" y="55" fill="#a5b4fc" font-size="11" font-family="monospace">N₂(g) + 3H₂(g) ⇌ 2NH₃(g)</text>
      <text x="35" y="75" fill="#38bdf8" font-size="10" font-family="sans-serif">[NH₃]eq = 0.4 M</text>
      <text x="120" y="75" fill="#f59e0b" font-size="10" font-family="sans-serif">Find Kc = ?</text>
    </svg>`,
  },
];

export const DEFAULT_QUIZ_POOL: QuizQuestion[] = [
  {
    id: 'q-1',
    subject: 'Physics',
    question: 'If you double the length of a simple pendulum, what happens to its period of oscillation T?',
    options: [
      'The period doubles (2x)',
      'The period increases by a factor of √2 (≈ 1.414x)',
      'The period quadruples (4x)',
      'The period remains unchanged',
    ],
    correctIndex: 1,
    explanation: 'From T = 2π√(L/g), T is proportional to the square root of length L. If L becomes 2L, T becomes √(2) · T ≈ 1.414 T.',
    hint1: 'Look at how length L appears inside the pendulum formula. Is it linear or inside a radical?',
    hint2: 'Formula: T = 2π√(L/g). Try substituting L_new = 2 · L.',
    hint3: 'Notice that √(2L) = √2 · √L. The factor multiplying the original period is therefore √2.',
    hint4: 'Correct answer is: Increases by √2 (approx 1.414 times).',
  },
  {
    id: 'q-2',
    subject: 'Chemistry',
    question: 'How many single covalent bonds does a central Carbon atom typically form to satisfy its outer octet?',
    options: ['2 bonds', '3 bonds', '4 bonds', '6 bonds'],
    correctIndex: 2,
    explanation: 'Carbon has 4 valence electrons and requires 4 additional electrons to fill its second shell with 8 electrons, forming 4 single bonds (such as in CH₄).',
    hint1: 'Consider how many valence electrons Carbon has in its outer shell (Group 14).',
    hint2: 'Octet rule requires 8 total electrons. Carbon starts with 4.',
    hint3: '8 needed minus 4 owned = 4 shared pairs needed.',
    hint4: 'Correct answer is 4 bonds (tetrahedral geometry in CH₄).',
  },
  {
    id: 'q-3',
    subject: 'Maths',
    question: 'What is the x-coordinate of the vertex of the parabola f(x) = 2x² - 8x + 3?',
    options: ['x = 4', 'x = 2', 'x = -2', 'x = 1'],
    correctIndex: 1,
    explanation: 'The vertex x-coordinate is given by x = -b / (2a). Here a = 2 and b = -8, so x = -(-8) / (2 * 2) = 8 / 4 = 2.',
    hint1: 'Recall the axis of symmetry formula for any standard quadratic y = ax² + bx + c.',
    hint2: 'Formula: x_vertex = -b / (2a).',
    hint3: 'Substitute a = 2 and b = -8: x = -(-8) / (2 · 2).',
    hint4: 'Correct answer is x = 2. Plug in x=2 to get y = 2(4) - 16 + 3 = -5.',
  },
  {
    id: 'q-4',
    subject: 'Biology',
    question: 'Which chamber of the human heart has the thickest muscular wall and pumps oxygenated blood to the entire body?',
    options: ['Right Atrium', 'Right Ventricle', 'Left Atrium', 'Left Ventricle'],
    correctIndex: 3,
    explanation: 'The Left Ventricle must generate high systemic arterial pressure (~120 mmHg) to push blood through the aorta across the entire body, so its myocardium is significantly thicker.',
    hint1: 'Think about whether high pressure is required for the short trip to the lungs or the long trip to all tissues.',
    hint2: 'Oxygenated blood comes from the pulmonary veins into the left side of the heart.',
    hint3: 'The ventricles pump blood out; the atria only receive blood. The left side handles systemic circulation.',
    hint4: 'Correct answer is Left Ventricle.',
  },
];
