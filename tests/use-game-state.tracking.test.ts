import { describe, it, expect, vi, beforeEach } from 'vitest';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useGameState } from '@/hooks/use-game-state';
import { act, renderHook } from '@testing-library/react-hooks';

vi.mock('@react-native-async-storage/async-storage', () => ({
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}));

describe('useGameState - tracking methods', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as any).mockReset();
    (AsyncStorage.setItem as any).mockReset();
  });

  it('logWorkout persists a training and updates bioMonitor XP and hardware', async () => {
    (AsyncStorage.getItem as any).mockResolvedValueOnce(null); // no game state

    const { result, waitForNextUpdate } = renderHook(() => useGameState());
    // wait for load
    await waitForNextUpdate();

    await act(async () => {
      await result.current.createNewGame('Test', 'netrunner');
    });

    const beforeXp = result.current.gameState!.bioMonitor.totalXp;
    await act(async () => {
      await result.current.logWorkout(30, 'moderate', 250);
    });

    expect(result.current.gameState!.trainings!.length).toBeGreaterThan(0);
    expect(result.current.gameState!.bioMonitor.totalXp).toBeGreaterThan(beforeXp);
    expect((AsyncStorage.setItem as any)).toHaveBeenCalled();
  });

  it('logStudy persists a study and updates RAM and XP', async () => {
    (AsyncStorage.getItem as any).mockResolvedValueOnce(null);
    const { result, waitForNextUpdate } = renderHook(() => useGameState());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.createNewGame('Test', 'netrunner');
    });

    const beforeRam = result.current.gameState!.bioMonitor.ram;
    await act(async () => {
      await result.current.logStudy(1.5, 'math');
    });

    expect(result.current.gameState!.studies!.length).toBeGreaterThan(0);
    expect(result.current.gameState!.bioMonitor.ram).toBeGreaterThanOrEqual(beforeRam);
    expect((AsyncStorage.setItem as any)).toHaveBeenCalled();
  });

  it('logMeal persists a meal and applies credits and XP', async () => {
    (AsyncStorage.getItem as any).mockResolvedValueOnce(null);
    const { result, waitForNextUpdate } = renderHook(() => useGameState());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.createNewGame('Test', 'netrunner');
    });

    const beforeCredits = result.current.gameState!.bioMonitor.credits;
    await act(async () => {
      await result.current.logMeal(700, 'Lunch');
    });

    expect(result.current.gameState!.meals!.length).toBeGreaterThan(0);
    expect(result.current.gameState!.bioMonitor.credits).toBeGreaterThanOrEqual(beforeCredits);
    expect((AsyncStorage.setItem as any)).toHaveBeenCalled();
  });

  it('logWater persists a water log and increases RAM', async () => {
    (AsyncStorage.getItem as any).mockResolvedValueOnce(null);
    const { result, waitForNextUpdate } = renderHook(() => useGameState());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.createNewGame('Test', 'netrunner');
    });

    const beforeRam = result.current.gameState!.bioMonitor.ram;
    await act(async () => {
      await result.current.logWater(500);
    });

    expect(result.current.gameState!.waterLogs!.length).toBeGreaterThan(0);
    expect(result.current.gameState!.bioMonitor.ram).toBeGreaterThanOrEqual(beforeRam);
    expect((AsyncStorage.setItem as any)).toHaveBeenCalled();
  });
});