// Biometric and RPG Types for Habittus - Multi-Dimensional Life RPG

export type ClassType = 
  | 'netrunner' 
  | 'solo' 
  | 'fixer' 
  | 'techie'
  | 'cyborg'
  | 'hacker'
  | 'gladiador'
  | 'ninja'
  | 'tita'
  | 'mestre'
  | 'ser-supremo';

export type Gender = 'male' | 'female';

export type TrainingType = 'strength' | 'cardio' | 'functional' | 'yoga';

export type Pillar = 'health' | 'nutrition' | 'study' | 'productivity' | 'finance' | 'habits' | 'social';

export type ActivityType = 
  | 'training' 
  | 'meal' 
  | 'water' 
  | 'study' 
  | 'task' 
  | 'debt_payment' 
  | 'savings' 
  | 'investment' 
  | 'meditation' 
  | 'journaling' 
  | 'social';

export interface BiometricData {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  bodyFatPercent: number;
  tdee: number;
  tmb: number;
}

export interface UserStats {
  strength: number;      // Força (STR) - Treino físico
  agility: number;       // Agilidade (AGI) - Cardio, mobilidade
  constitution: number;  // Constituição (CON) - Nutrição, sono
  intelligence: number;  // Inteligência (INT) - Estudo, produtividade
  wisdom: number;        // Sabedoria (WIS) - Hábitos, meditação
  charisma: number;      // Carisma (CHA) - Social, networking
  willpower: number;     // Vontade (WIL) - Streak, disciplina
}

export interface PillarStats {
  health: number;        // Saúde Física (0-100)
  nutrition: number;     // Nutrição (0-100)
  study: number;         // Estudo (0-100)
  productivity: number;  // Produtividade (0-100)
  finance: number;       // Finanças (0-100)
  habits: number;        // Hábitos (0-100)
  social: number;        // Social (0-100)
}

export interface Training {
  id: string;
  type: TrainingType;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
  timestamp: number;
  caloriesBurned: number;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: number;
}

export interface StudySession {
  id: string;
  topic: string;
  durationMinutes: number;
  type: 'reading' | 'course' | 'practice' | 'project';
  timestamp: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: number;
  priority: 'low' | 'medium' | 'high';
  pillar: Pillar;
  xpReward: number;
}

export interface Debt {
  id: string;
  name: string;
  totalAmount: number;
  paidAmount: number;
  interestRate: number;
  dueDate?: number;
  type: 'credit_card' | 'loan' | 'personal' | 'other';
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: number;
  type: 'savings' | 'investment' | 'debt_payoff' | 'income_goal';
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completedDates: number[];
  streak: number;
  pillar: Pillar;
  xpReward: number;
}

export interface SocialActivity {
  id: string;
  name: string;
  type: 'networking' | 'mentoring' | 'community' | 'interaction';
  timestamp: number;
  impact: 'low' | 'medium' | 'high';
}

export interface DailyTracking {
  date: string; // YYYY-MM-DD
  trainings: Training[];
  meals: Meal[];
  waterIntakeLiters: number;
  studySessions: StudySession[];
  tasksCompleted: Task[];
  debtsPaid: { debtId: string; amount: number }[];
  savingsAmount: number;
  investmentsAmount: number;
  meditationMinutes: number;
  journalingDone: boolean;
  socialActivities: SocialActivity[];
  sleepHours: number;
  sleepQuality: number; // 1-5
  stressLevel: number; // 1-10
  energyLevel: number; // 1-10
}

export interface UserProfile {
  id: string;
  name: string;
  characterName: string;
  biometrics: BiometricData;
  stats: UserStats;
  pillarStats: PillarStats;
  currentClass: ClassType;
  unlockedClasses: ClassType[];
  streak: number;
  totalXP: number;
  gold: number;
  weight: number;
  bodyFatPercent: number;
  
  // Financial tracking
  totalIncome: number;
  totalDebt: number;
  totalSavings: number;
  totalInvested: number;
  
  // Study tracking
  totalHoursStudied: number;
  booksRead: number;
  coursesCompleted: number;
  
  // Productivity tracking
  tasksCompleted: number;
  projectsCompleted: number;
  
  // Social tracking
  socialInteractions: number;
  
  // Habits tracking
  habitsFormed: number;
  
  createdAt: number;
  lastActivityDate: string;
  dailyTrackingHistory: DailyTracking[];
  
  // Collections
  debts: Debt[];
  financialGoals: FinancialGoal[];
  habits: Habit[];
  tasks: Task[];
}

export interface ClassInfo {
  id: ClassType;
  name: string;
  description: string;
  emoji: string;
  color: string;
  primaryPillar: Pillar;
  primaryStats: {
    stat: keyof UserStats;
    bonus: number;
  }[];
  secondaryStats: {
    stat: keyof UserStats;
    penalty: number;
  }[];
  xpBonus: number;
  requirements?: {
    minStats?: Partial<UserStats>;
    minPillarStats?: Partial<PillarStats>;
    minStreak?: number;
    minActivities?: { pillar: Pillar; count: number }[];
  };
}

export interface TriageResponse {
  objectives: Pillar[];
  
  // Health
  currentTrainingFrequency: number;
  primaryTrainingType: TrainingType | null;
  healthObjectives: string[];
  
  // Nutrition
  dietType: string;
  mealsPerDay: number;
  nutritionObjectives: string[];
  
  // Study
  educationLevel: string;
  hoursStudyPerWeek: number;
  areasOfInterest: string[];
  studyObjectives: string[];
  
  // Productivity
  hoursOfFocusPerDay: number;
  productivityObjectives: string[];
  
  // Finance
  monthlyIncome: number;
  totalDebt: number;
  monthlySavings: number;
  financialObjectives: string[];
  
  // Habits
  averageSleepHours: number;
  meditationFrequency: 'daily' | 'weekly' | 'never';
  journalingFrequency: 'daily' | 'weekly' | 'never';
  stressLevel: number; // 1-10
  
  // Social
  socialActivitiesPerWeek: number;
  networkingInterest: boolean;
  mentoringInterest: boolean;
  socialObjectives: string[];
}

export interface ClassificationResult {
  baseClass: ClassType;
  reasoning: string;
  statBoosts: Partial<UserStats>;
  pillarBoosts: Partial<PillarStats>;
}

export interface VisualCharacter {
  class: ClassType;
  weight: number;
  bodyFatPercent: number;
  stats: UserStats;
  pillarStats: PillarStats;
  energyLevel: number; // 0-100
  silhouette: 'slim' | 'normal' | 'overweight';
  muscleDef: number; // 0-100
  skinGlow: number; // 0-100
  aura: {
    color: string;
    intensity: number; // 0-100
    pillarColors: Record<Pillar, string>;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  pillar: Pillar;
  icon: string;
  unlockedAt?: number;
  progress: number; // 0-100
  requirement: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  costGold: number;
  type: 'item' | 'experience' | 'boost' | 'cosmetic';
  pillar: Pillar;
  effect?: {
    stat?: keyof UserStats;
    amount?: number;
    duration?: number; // in hours
  };
}
