import { describe, it, expect } from 'vitest';

import {
  calculateTMB,
  calculateTDEE,
  calculateBMI,
  classifyUser,
  calculateStatusDecay,
  checkClassUnlock,
} from '../lib/biometric-calculator';

import type { TriageResponse, BiometricData } from '../types/biometric';

describe('biometric-calculator', () => {
  it('calculates TMB correctly for male', () => {
    const tmb = calculateTMB(70, 175, 25, 'male');
    // (10*70) + (6.25*175) - (5*25) + 5 = 1673.75
    expect(tmb).toBeCloseTo(1673.75, 2);
  });

  it('calculates TMB correctly for female', () => {
    const tmb = calculateTMB(60, 165, 30, 'female');
    // (10*60) + (6.25*165) - (5*30) - 161 = 1320.25
    expect(tmb).toBeCloseTo(1320.25, 2);
  });

  it('calculates TDEE with multipliers', () => {
    const tdeeSed = calculateTDEE(1500, 'sedentary');
    const tdeeMod = calculateTDEE(1500, 'moderate');
    const tdeeAct = calculateTDEE(1500, 'active');

    expect(tdeeSed).toBeCloseTo(1500 * 1.2, 2);
    expect(tdeeMod).toBeCloseTo(1500 * 1.55, 2);
    expect(tdeeAct).toBeCloseTo(1500 * 1.725, 2);
  });

  it('calculates BMI correctly', () => {
    const bmi = calculateBMI(70, 175);
    expect(bmi).toBeCloseTo(22.857, 2);
  });

  it('classifies user as SOLO when health objective and strength training', () => {
    const triage: TriageResponse = {
      objectives: ['health'],
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
      hoursStudyPerWeek: 0,
      areasOfInterest: [],
      hoursOfFocusPerDay: 1,
      monthlyIncome: 0,
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
      age: 25,
      gender: 'male',
      heightCm: 175,
      weightKg: 75,
      bodyFatPercent: 18,
      tdee: 2500,
      tmb: 1700,
    };

    const classification = classifyUser(triage, biometrics);
    expect(classification.baseClass).toBe('solo');
  });

  it('applies status decay over days', () => {
    const decayed = calculateStatusDecay(100, 2); // 5% per day => ~10% total
    expect(decayed).toBeCloseTo(90, 1);
  });

  it('detects cyborg class unlock with sufficient stats', () => {
    const stats = {
      strength: 75,
      agility: 72,
      constitution: 70,
      intelligence: 50,
      wisdom: 50,
      charisma: 40,
      willpower: 50,
    } as any;

    const trainings: Record<string, number> = {
      strength: 60,
      functional: 60,
      task: 0,
      social: 0,
    };

    const unlocked = checkClassUnlock(stats, 30, trainings);
    expect(unlocked).toBe('cyborg');
  });
});
