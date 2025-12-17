import { describe, expect, it } from 'vitest';
import { calculateTMB, calculateTDEE, classifyUser } from '@/lib/biometric-calculator';

import type { TriageResponse, BiometricData } from '@/types/biometric';

describe('biometric calculator', () => {
  it('calculates TMB correctly for male', () => {
    const tmb = calculateTMB(75, 175, 25, 'male');
    // (10*75) + (6.25*175) - (5*25) + 5 = 1723.75
    expect(Math.round(tmb * 100) / 100).toBeCloseTo(1723.75, 2);
  });

  it('calculates TDEE with sedentary multiplier', () => {
    const tmb = 1723.75;
    const tdee = calculateTDEE(tmb, 'sedentary');
    expect(Math.round(tdee)).toBe(Math.round(1723.75 * 1.2));
  });

  it('classifies a user and returns a valid class', () => {
    const triage: TriageResponse = {
      objectives: ['health', 'nutrition'],
      currentTrainingFrequency: 4,
      primaryTrainingType: 'strength',
      healthObjectives: [],
      nutritionObjectives: [],
      studyObjectives: [],
      productivityObjectives: [],
      financialObjectives: [],
      socialObjectives: [],
      averageSleepHours: 7,
      mealsPerDay: 3,
      educationLevel: 'superior',
      hoursStudyPerWeek: 5,
      areasOfInterest: [],
      hoursOfFocusPerDay: 1,
      monthlyIncome: 2000,
      totalDebt: 0,
      monthlySavings: 0,
      meditationFrequency: 'never',
      journalingFrequency: 'never',
      stressLevel: 5,
      socialActivitiesPerWeek: 0,
      networkingInterest: false,
      mentoringInterest: false,
      dietType: 'balanced',
    };

    const biometrics: BiometricData = {
      age: 30,
      gender: 'male',
      heightCm: 180,
      weightKg: 80,
      bodyFatPercent: 18,
      tdee: 2500,
      tmb: 1700,
    };

    const result = classifyUser(triage, biometrics);
    expect(result.baseClass).toBeTruthy();
    expect(result.statBoosts).toBeDefined();
  });
});