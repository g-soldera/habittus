// Biometric and RPG Types for Habittus

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

export interface BiometricData {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  bodyFatPercent: number;
  tdee: number; // Total Daily Energy Expenditure
  tmb: number;  // Taxa Metabólica Basal
}

export interface UserStats {
  strength: number;      // Força (STR)
  agility: number;       // Agilidade (AGI)
  constitution: number;  // Constituição (CON)
  intelligence: number;  // Inteligência (INT)
  wisdom: number;        // Sabedoria (WIS)
  charisma: number;      // Carisma (CHA)
}

export interface DailyTracking {
  date: string; // YYYY-MM-DD
  waterIntakeLiters: number;
  caloriesConsumed: number;
  caloriesBurned: number;
  sleepHours: number;
  sleepQuality: number; // 1-5
  trainings: Training[];
  socialActivities: number;
}

export interface Training {
  id: string;
  type: TrainingType;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
  timestamp: number;
  caloriesBurned: number;
}

export interface UserProfile {
  id: string;
  name: string;
  characterName: string;
  biometrics: BiometricData;
  stats: UserStats;
  currentClass: ClassType;
  unlockedClasses: ClassType[];
  streak: number;
  totalXP: number;
  gold: number;
  weight: number; // Current weight in kg
  bodyFatPercent: number; // Current body fat percentage
  createdAt: number;
  lastActivityDate: string; // YYYY-MM-DD
  dailyTrackingHistory: DailyTracking[];
}

export interface ClassInfo {
  id: ClassType;
  name: string;
  description: string;
  emoji: string;
  color: string;
  primaryStats: {
    stat: keyof UserStats;
    bonus: number;
  }[];
  secondaryStats: {
    stat: keyof UserStats;
    penalty: number;
  }[];
  xpBonus: number; // Percentage
  requirements?: {
    minStats?: Partial<UserStats>;
    minStreak?: number;
    minTrainings?: { type: TrainingType; count: number }[];
    minActivities?: number;
  };
}

export interface TriageResponse {
  objectives: string[];
  currentTrainingFrequency: number; // times per week
  primaryTrainingType: TrainingType | null;
  averageSleepHours: number;
  dailyWaterIntake: number;
  mealsPerDay: number;
  activityLevel: 'sedentary' | 'moderate' | 'active';
}

export interface ClassificationResult {
  baseClass: ClassType;
  reasoning: string;
  statBoosts: Partial<UserStats>;
}

export interface StatusDecay {
  stat: keyof UserStats;
  decayPercentagePerDay: number;
  maxDecayDays: number;
}

export interface VisualCharacter {
  class: ClassType;
  weight: number;
  bodyFatPercent: number;
  stats: UserStats;
  energyLevel: number; // 0-100
  silhouette: 'slim' | 'normal' | 'overweight';
  muscleDef: number; // 0-100
  skinGlow: number; // 0-100
  aura: string; // Color based on stats
}
