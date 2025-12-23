import { describe, it, expect } from 'vitest';
import { checkClassUnlock } from '@/lib/biometric-calculator';

describe('class unlock rules', () => {
  it('does not unlock classes for low stats', () => {
    const stats = { strength: 50, agility: 50, constitution: 50, intelligence: 50, wisdom: 50, charisma: 50, willpower: 50 };
    const result = checkClassUnlock(stats as any, 10, {});
    expect(result).toBeNull();
  });

  it('unlocks cyborg with high stats and trainings', () => {
    const stats = { strength: 80, agility: 75, constitution: 80, intelligence: 40, wisdom: 40, charisma: 40, willpower: 50 };
    const trainings = { strength: 60, functional: 60 };
    const result = checkClassUnlock(stats as any, 40, trainings);
    expect(result).toBe('cyborg');
  });

  it('unlocks ser-supremo for extreme stats and trainings', () => {
    const stats = { strength: 95, agility: 95, constitution: 95, intelligence: 95, wisdom: 95, charisma: 95, willpower: 100 };
    const trainings = { strength: 200, functional: 200, task: 200, social: 120 };
    const result = checkClassUnlock(stats as any, 400, trainings);
    expect(result).toBe('ser-supremo');
  });
});