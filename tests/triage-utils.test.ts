import { describe, expect, it } from 'vitest';
import { validateAge, validateBiometrics, estimateTmbTdee } from '@/lib/triage-utils';

describe('triage-utils', () => {
  it('validates age bounds', () => {
    expect(validateAge(17).valid).toBe(false);
    expect(validateAge(18).valid).toBe(true);
    expect(validateAge(100).valid).toBe(true);
    expect(validateAge(101).valid).toBe(false);
  });

  it('validates biometrics ranges', () => {
    expect(validateBiometrics(175, 75, 15).valid).toBe(true);
    expect(validateBiometrics(90, 20, 10).valid).toBe(false); // height too low
    expect(validateBiometrics(280, 80, 10).valid).toBe(false); // height too high
  });

  it('estimates tmb/tdee', () => {
    const res = estimateTmbTdee(75, 175, 25, 'male', 3);
    expect(res.tmb).toBeGreaterThan(1000);
    expect(res.tdee).toBeGreaterThan(res.tmb);
    expect(['sedentary', 'moderate', 'active']).toContain(res.activityLevel);
  });
});
