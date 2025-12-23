import { describe, it, expect, vi, beforeEach } from 'vitest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, act } from '@testing-library/react-hooks';
import { useGameState } from '@/hooks/use-game-state';

vi.mock('@react-native-async-storage/async-storage', () => ({
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}));

// Mock biometric-checking function to force class unlock
vi.mock('@/lib/biometric-calculator', async () => {
  const original = await vi.importActual('@/lib/biometric-calculator');
  return {
    ...original,
    checkClassUnlock: (stats: any, streak: number, trainings: any) => {
      if (stats.strength >= 80) return 'cyborg';
      return null;
    },
  };
});

describe('useGameState evaluateClassUnlocks', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as any).mockReset();
    (AsyncStorage.setItem as any).mockReset();
  });

  it('adds unlocked class to userProfile when conditions met', async () => {
    (AsyncStorage.getItem as any).mockResolvedValueOnce(null); // no user profile

    const { result, waitForNextUpdate } = renderHook(() => useGameState());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.saveUserProfile({
        characterName: 'Test',
        biometrics: { age: 30, gender: 'male', heightCm: 175, weightKg: 80, bodyFatPercent: 15, tdee: 2500, tmb: 1700 },
        baseClass: 'netrunner',
        initialStats: { strength: 85, agility: 50, constitution: 50, intelligence: 40, wisdom: 40, charisma: 40, willpower: 50 },
        pillarStats: {},
      } as any);
    });

    // seed a training log so trainingsCount is non-empty
    await act(async () => {
      await result.current.logWorkout(30, 'moderate', 200);
    });

    const unlocked = await act(async () => {
      return await result.current.evaluateClassUnlocks();
    });

    expect(unlocked).toBe('cyborg');
    expect(result.current.userProfile!.unlockedClasses).toContain('cyborg');
    expect((AsyncStorage.setItem as any)).toHaveBeenCalled();
  });
});