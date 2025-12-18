import { describe, expect, it } from 'vitest';
import {
  computeWorkoutXp,
  computeStudyXp,
  computeMealXp,
  computeWaterRamBoost,
  createTrainingLog,
  createMealLog,
  createStudyLog,
  createWaterLog,
} from '@/lib/tracking';

describe('tracking computations', () => {
  it('computes workout xp for various intensities', () => {
    expect(computeWorkoutXp(30, 'low')).toBeGreaterThan(0);
    expect(computeWorkoutXp(30, 'moderate')).toBeGreaterThan(computeWorkoutXp(30, 'low'));
    expect(computeWorkoutXp(30, 'high')).toBeGreaterThan(computeWorkoutXp(30, 'moderate'));
  });

  it('computes study xp proportional to hours', () => {
    expect(computeStudyXp(1)).toBe(50);
    expect(computeStudyXp(2)).toBe(100);
  });

  it('computes meal xp and water boost', () => {
    expect(computeMealXp(600)).toBeGreaterThan(0);
    expect(computeWaterRamBoost(500)).toBe(2);
    expect(computeWaterRamBoost(2500)).toBe(10); // capped
  });

  it('creates logs with xp attached', () => {
    const t = createTrainingLog(45, 'moderate', 400);
    expect(t.xpGained).toBeGreaterThan(0);

    const s = createStudyLog(1.5, 'math');
    expect(s.xpGained).toBeGreaterThan(0);

    const m = createMealLog(700, 'breakfast');
    expect(m.xpGained).toBeGreaterThanOrEqual(0);

    const w = createWaterLog(500);
    expect(w.ramBoost).toBeGreaterThanOrEqual(0);
  });
});