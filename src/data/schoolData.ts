import {
  DigitalSchoolId,
  SchoolAnnouncement,
  HomeworkItem,
  UpcomingExam,
  ProjectShowcaseItem,
  CalendarEvent,
  TrophyCabinetItem,
  LiveEventItem,
  TeacherAssignment,
} from '../types';

export const DEFAULT_STUDENT_ID: DigitalSchoolId = {
  studentName: 'Alex Explorer',
  studentId: 'APEX-2026-0914',
  grade: 'Class 9',
  section: 'Section A (STEM Honors)',
  rollNo: 14,
  house: 'Newton Phoenix',
  houseColor: '#ef4444',
  attendancePct: 96.8,
  academicYear: '2026 - 2027',
  bloodGroup: 'O+',
  emergencyContact: '+1 (555) 382-9014',
  qrCodeData: 'HTTPS://APEX-ACADEMY.EDU/VERIFY/APEX-2026-0914',
};

export const INITIAL_ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: 'ann-1',
    title: '🏆 National Robotics Championship 1st Place Victory!',
    date: 'Today, 8:30 AM',
    category: 'Robotics',
    content:
      'Congratulations to the Apex Autonomous Rover Team for winning 1st Place Gold at the National Youth Robotics Expo! Team project on display in the STEM Showcase Hall.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'ann-2',
    title: '📝 Midterm Examination Timetable Released',
    date: 'Yesterday',
    category: 'Academic',
    content:
      'The Class 9 & 10 Midterm Examinations commence on October 12, 2026. Review syllabus topics in your Smart School Calendar and access revision materials in the Lesson Explainer.',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
  {
    id: 'ann-3',
    title: '🏃 Annual Inter-School Sports Meet 2026 Registrations Open',
    date: '2 days ago',
    category: 'Sports',
    content:
      'House captains are registering participants for track & field, relay sprint, and basketball tournaments. House trials begin this Friday after school.',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
];

export const INITIAL_HOMEWORK: HomeworkItem[] = [
  {
    id: 'hw-1',
    title: 'Physics: Pendulum Oscillation Harmonic Lab Report',
    subject: 'Physics',
    dueDate: 'Tomorrow, 5:00 PM',
    assignedBy: 'Dr. Evelyn Reed',
    status: 'pending',
    description:
      'Record period T across 4 different string lengths in the Virtual Physics Lab and plot T² vs L.',
  },
  {
    id: 'hw-2',
    title: 'Maths: Quadratic Formula & Parabolic Tangents',
    subject: 'Maths',
    dueDate: 'Oct 5, 2026',
    assignedBy: 'Prof. Jonathan Hayes',
    status: 'pending',
    description:
      'Solve exercises 4.2 through 4.6. Find roots, discriminant nature, and graph vertices.',
  },
  {
    id: 'hw-3',
    title: 'Chemistry: Lewis Dot & Octet Structure of CO₂ and H₂O',
    subject: 'Chemistry',
    dueDate: 'Oct 3, 2026',
    assignedBy: 'Dr. Sarah Connor',
    status: 'submitted',
    grade: 'A+ (98%)',
    description:
      'Diagram valence electron sharing in covalent double bonds using the Molecule Builder.',
  },
];

export const UPCOMING_EXAMS: UpcomingExam[] = [
  {
    id: 'ex-1',
    subject: 'Physics',
    title: 'Class 9 Midterm: Mechanics, Harmonic Motion & Newton’s Laws',
    date: 'Oct 12, 2026',
    time: '09:00 AM - 11:30 AM',
    syllabus: 'Chapters 1 to 4: Kinematics, Pendulum SHM, Friction, Gravitational Fields',
    room: 'Hall 302 (North Wing)',
  },
  {
    id: 'ex-2',
    subject: 'Maths',
    title: 'Class 9 Midterm: Polynomials, Quadratics & Coordinate Geometry',
    date: 'Oct 15, 2026',
    time: '09:00 AM - 12:00 PM',
    syllabus: 'Real Numbers, Quadratic Roots, Discriminant, Parabolic Functions',
    room: 'Main Auditorium',
  },
  {
    id: 'ex-3',
    subject: 'Chemistry',
    title: 'Class 9 Midterm: Chemical Bonding, Octet Rule & Equilibrium',
    date: 'Oct 18, 2026',
    time: '09:00 AM - 11:30 AM',
    syllabus: 'Periodic Trends, Covalent/Ionic Bonding, Reaction Rates, Acid-Base',
    room: 'Science Lab 2',
  },
];

export const PROJECT_SHOWCASES: ProjectShowcaseItem[] = [
  {
    id: 'proj-1',
    title: 'Autonomous Obstacle-Navigating Mars Rover "AeroRover X1"',
    category: 'Robotics',
    team: ['Alex Explorer', 'Sophia Chen', 'Marcus Vance'],
    problem:
      'Traditional planetary rovers struggle with dynamic terrain mapping and latency when communicating with Earth, leading to wheel entrapment in soft Martian regolith.',
    solution:
      'Engineered a 6-wheel rocker-bogie chassis with LiDAR depth sensing, ultrasonic terrain scanners, and onboard AI path planning to execute real-time obstacle avoidance in under 40 milliseconds.',
    results:
      'Successfully navigated a 50-meter rocky obstacle course in 1m 42s with zero collisions. Awarded 1st Place Gold at the National Youth Robotics Olympiad!',
    techStack: ['ROS2', 'Arduino Mega', 'Computer Vision', 'LiDAR', '3D Printing'],
    status: 'Completed - 1st Prize',
    accentColor: 'border-amber-500/50 from-amber-950/30',
  },
  {
    id: 'proj-2',
    title: 'AI Smart Hydroponics & Autonomous Water Quality Drone',
    category: 'AI & IoT',
    team: ['Priya Sharma', 'Alex Explorer', 'David Kim'],
    problem:
      'School agricultural greenhouses waste up to 45% of water and struggle to maintain optimal nitrogen-phosphorus-potassium (NPK) nutrient balance manually.',
    solution:
      'Created an IoT sensor mesh with pH, EC, and dissolved oxygen probes hooked up to automated peristaltic dosing pumps, monitored via an AI dashboard that predicts plant disease.',
    results:
      'Cut water consumption by 52% while accelerating leafy green growth cycles by 18 days. Featured at the State Science & Innovation Expo.',
    techStack: ['ESP32', 'Python', 'TensorFlow Lite', 'IoT Sensors', 'Solar Cells'],
    status: 'Exhibition Winner',
    accentColor: 'border-emerald-500/50 from-emerald-950/30',
  },
  {
    id: 'proj-3',
    title: 'Low-Cost 3D-Printed Bionic Prosthetic Hand with EMG Sensors',
    category: 'Biotech',
    team: ['Alex Explorer', 'Liam O’Connor'],
    problem:
      'Commercial myoelectric prosthetic hands cost $10,000 to $40,000, making them completely unaffordable for growing pediatric amputees.',
    solution:
      'Designed an anatomical 5-finger prosthetic actuated by micro servo motors and tendon wires, controlled via non-invasive electromyography (EMG) muscle sensors on the forearm.',
    results:
      'Total bill of materials kept under $85. Supports 6 distinct grip patterns (pinch, grasp, point) with 94% EMG classification accuracy.',
    techStack: ['Biomedical Sensors', 'CAD (Fusion 360)', 'Microcontrollers', 'Biomechanics'],
    status: 'In Progress',
    accentColor: 'border-sky-500/50 from-sky-950/30',
  },
];

export const SMART_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: 'Physics Midterm Examination',
    date: '2026-10-12',
    time: '09:00 AM',
    category: 'exam',
    location: 'Exam Hall 302',
    description: 'Class 9 & 10 physics written exam covering Kinematics & Simple Harmonic Motion.',
  },
  {
    id: 'cal-2',
    title: 'Autumn School Break (Holiday)',
    date: '2026-10-14',
    time: 'All Day',
    category: 'holiday',
    location: 'Campus Closed',
    description: 'School holiday for mid-semester recess.',
  },
  {
    id: 'cal-3',
    title: 'Maths Midterm Examination',
    date: '2026-10-15',
    time: '09:00 AM',
    category: 'exam',
    location: 'Main Auditorium',
    description: 'Comprehensive algebra, quadratics, and trigonometry examination.',
  },
  {
    id: 'cal-4',
    title: 'Regional Robotics League Finals',
    date: '2026-10-20',
    time: '10:00 AM',
    category: 'competition',
    location: 'Tech Convention Center',
    description: 'Apex Robotics Team defending autonomous rover title.',
  },
  {
    id: 'cal-5',
    title: 'Parent-Teacher Conference (PTM)',
    date: '2026-10-24',
    time: '01:00 PM - 05:00 PM',
    category: 'ptm',
    location: 'Academic Classrooms & Virtual Zoom',
    description: 'One-on-one reviews of student midterm academic performance and STEM lab achievements.',
  },
  {
    id: 'cal-6',
    title: 'Annual STEM & Science Exhibition Gala',
    date: '2026-10-30',
    time: '09:30 AM - 04:00 PM',
    category: 'event',
    location: 'Main Sports Complex & STEM Pavilion',
    description: 'Live interactive demonstrations of student projects, virtual labs, and robotics arenas.',
  },
];

export const TROPHY_CABINET_ITEMS: TrophyCabinetItem[] = [
  {
    id: 'trophy-1',
    title: 'National Autonomous Rover Championship',
    competition: 'National Youth Robotics Federation',
    category: 'Robotics',
    year: '2026',
    rank: '1st Place Gold',
    description:
      'Apex Academy Robotics Team took 1st place among 120 national schools for autonomous obstacle traversal.',
    icon: '🤖',
    badgeColor: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'trophy-2',
    title: 'State Inter-School Basketball Trophy',
    competition: 'State Interscholastic Athletic League',
    category: 'Sports',
    year: '2026',
    rank: 'State Champions',
    description:
      'Undefeated season (14-0) finishing with a 68-59 championship victory in the finals.',
    icon: '🏀',
    badgeColor: 'from-orange-500 to-red-600',
  },
  {
    id: 'trophy-3',
    title: 'National Mathematical Olympiad Cup',
    competition: 'Mathematical Association of Science',
    category: 'Academics',
    year: '2025',
    rank: '1st Place Gold',
    description:
      'Top school aggregate score in algebra, number theory, and geometric proofs.',
    icon: '📐',
    badgeColor: 'from-sky-400 to-blue-600',
  },
  {
    id: 'trophy-4',
    title: 'Clean Energy & Green Innovation Award',
    competition: 'Governor’s Youth Environmental Summit',
    category: 'Robotics',
    year: '2025',
    rank: 'Best Innovation',
    description:
      'Awarded for student-designed solar-powered autonomous algae monitoring drones.',
    icon: '🌱',
    badgeColor: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'trophy-5',
    title: 'All-State Symphony & Drama Cup',
    competition: 'State Youth Cultural Festival',
    category: 'Cultural',
    year: '2025',
    rank: 'National Finalist',
    description:
      'Excellence in orchestral performance and Shakespeare theatrical staging.',
    icon: '🎭',
    badgeColor: 'from-purple-400 to-pink-600',
  },
];

export const LIVE_SCHOOL_EVENTS: LiveEventItem[] = [
  {
    id: 'evt-1',
    title: 'Apex Annual STEM & Robotics Exhibition 2026',
    date: 'Oct 30, 2026',
    time: '9:30 AM - 4:00 PM',
    venue: 'Campus STEM Pavilion & Live Stream',
    status: 'Upcoming',
    description:
      'Experience 40+ student innovations, live drone obstacle races, virtual lab showcases, and guest keynote by NASA astrophysicists.',
    registered: true,
  },
  {
    id: 'evt-2',
    title: 'Inter-House Track & Sports Day Championship',
    date: 'Nov 6, 2026',
    time: '8:00 AM - 2:00 PM',
    venue: 'Olympic Athletic Track',
    status: 'Upcoming',
    description:
      'Newton Phoenix, Curie Cosmos, Turing Titans, and Galileo Guardians compete for the prestigious Annual Sports Shield.',
    registered: false,
  },
  {
    id: 'evt-3',
    title: 'Annual Arts & Cultural Gala "Aurora 2026"',
    date: 'Nov 20, 2026',
    time: '5:30 PM - 9:00 PM',
    venue: 'Grand Performing Arts Auditorium',
    status: 'Upcoming',
    description:
      'An evening celebrating student musical ensembles, classical and contemporary dance, and student theatrical drama.',
    registered: false,
  },
];

export const TEACHER_ASSIGNMENTS_DATA: TeacherAssignment[] = [
  {
    id: 't-asg-1',
    title: 'Physics Lab 3: Pendulum Harmonic Oscillation Report',
    subject: 'Physics',
    grade: 'Class 9-A',
    dueDate: 'Oct 2, 2026',
    submittedCount: 28,
    totalStudents: 32,
  },
  {
    id: 't-asg-2',
    title: 'Chemistry: Octet Rule & Covalent Molecule Construction',
    subject: 'Chemistry',
    grade: 'Class 9-A',
    dueDate: 'Oct 5, 2026',
    submittedCount: 22,
    totalStudents: 32,
  },
  {
    id: 't-asg-3',
    title: 'Maths Problem Set: Quadratic Roots & Graphing',
    subject: 'Maths',
    grade: 'Class 9-A',
    dueDate: 'Oct 7, 2026',
    submittedCount: 14,
    totalStudents: 32,
  },
];
