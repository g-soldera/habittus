import { describe, expect, it } from 'vitest';
import { createDefaultCharacter, createDefaultBioMonitor, createDefaultGameState } from '@/lib/mock-data';

describe('default game state', () => {
  it('initializes tracking arrays', () => {
    const char = createDefaultCharacter('Test', 'netrunner');
    const bio = createDefaultBioMonitor();
    const state = createDefaultGameState(char, bio);
    expect(state.trainings).toBeDefined();
    expect(state.meals).toBeDefined();
    expect(state.studies).toBeDefined();
    expect(state.waterLogs).toBeDefined();
    expect(Array.isArray(state.trainings)).toBeTruthy();
  });
});