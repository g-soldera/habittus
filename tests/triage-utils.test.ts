import { describe, it, expect } from 'vitest';
import { validateBasicInfo, validateBiometrics } from '@/lib/triage-utils';

describe('triage-utils validations', () => {
  it('validates basic info - valid', () => {
    const res = validateBasicInfo('Alice', '25');
    expect(res.valid).toBe(true);
  });

  it('validates basic info - invalid age', () => {
    const res = validateBasicInfo('Bob', '17');
    expect(res.valid).toBe(false);
    expect(res.reason).toMatch(/Idade/);
  });

  it('validates biometrics - valid', () => {
    const res = validateBiometrics('175', '75', '15');
    expect(res.valid).toBe(true);
  });

  it('validates biometrics - invalid height', () => {
    const res = validateBiometrics('90', '75', '15');
    expect(res.valid).toBe(false);
    expect(res.reason).toMatch(/Altura/);
  });
});