import { TrainingLog, MealLog, StudyLog, WaterLog } from '@/types';

export const computeWorkoutXp = (durationMinutes: number, intensity: 'low' | 'moderate' | 'high' = 'moderate') => {
  const intensityMultiplier = intensity === 'low' ? 0.6 : intensity === 'moderate' ? 1 : 1.4;
  const xp = Math.round(durationMinutes * 0.8 * intensityMultiplier);
  return Math.max(1, xp);
};

export const computeStudyXp = (hours: number) => {
  const xp = Math.round(hours * 50);
  return Math.max(1, xp);
};

export const computeMealXp = (calories: number) => {
  // Reward balanced nutrition lightly
  const xp = Math.round((calories / 500) * 20);
  return Math.max(0, xp);
};

export const computeWaterRamBoost = (ml: number) => {
  // For every 250ml give 1 RAM point temporarily (capped)
  const boost = Math.min(10, Math.floor(ml / 250));
  return boost;
};

export const createTrainingLog = (durationMinutes: number, intensity: 'low' | 'moderate' | 'high' = 'moderate', caloriesBurned?: number): TrainingLog => ({
  id: `training-${Date.now()}`,
  durationMinutes,
  caloriesBurned,
  intensity,
  xpGained: computeWorkoutXp(durationMinutes, intensity),
  createdAt: Date.now(),
});

export const createStudyLog = (hours: number, subject?: string): StudyLog => ({
  id: `study-${Date.now()}`,
  hours,
  subject,
  xpGained: computeStudyXp(hours),
  createdAt: Date.now(),
});

export const createMealLog = (calories: number, name?: string): MealLog => ({
  id: `meal-${Date.now()}`,
  name,
  calories,
  xpGained: computeMealXp(calories),
  createdAt: Date.now(),
});

export const createWaterLog = (ml: number): WaterLog => ({
  id: `water-${Date.now()}`,
  ml,
  ramBoost: computeWaterRamBoost(ml),
  createdAt: Date.now(),
});
