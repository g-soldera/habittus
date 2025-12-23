import { describe, it, expect, vi, beforeEach } from 'vitest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-hooks';
import { useGameState } from '@/hooks/use-game-state';

vi.mock('@react-native-async-storage/async-storage', () => ({
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}));

describe('useGameState - purchaseReward', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as any).mockReset();
    (AsyncStorage.setItem as any).mockReset();
    // Ensure network fetch does not interfere with client-only tests
    // If global fetch exists in the runner, stub it to reject so client fallback is used
    try {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('no network')));
    } catch (e) {
      // environments without stub support may throw - ignore
    }
  });

  it('deducts gold and adds item to inventory when affordable', async () => {
    (AsyncStorage.getItem as any).mockResolvedValueOnce(null);
    const { result, waitForNextUpdate } = renderHook(() => useGameState());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.createNewGame('Test', 'netrunner');
    });

    // Top up gold so we can purchase a reward
    const updated = { ...result.current.gameState! };
    updated.bioMonitor.totalGold = 500;
    await act(async () => {
      await result.current.saveGameState(updated);
    });

    const beforeGold = result.current.gameState!.bioMonitor.totalGold;

    await act(async () => {
      await result.current.purchaseReward('reward-2'); // Pizza is cost 80 by default
    });

    expect(result.current.gameState!.inventory.length).toBeGreaterThan(0);
    expect(result.current.gameState!.bioMonitor.totalGold).toBeLessThan(beforeGold);
    expect((AsyncStorage.setItem as any)).toHaveBeenCalled();
  });

  it('does nothing when insufficient gold', async () => {
    (AsyncStorage.getItem as any).mockResolvedValueOnce(null);
    const { result, waitForNextUpdate } = renderHook(() => useGameState());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.createNewGame('Test', 'netrunner');
    });

    // ensure low gold
    const updated = { ...result.current.gameState! };
    updated.bioMonitor.totalGold = 10;
    await act(async () => {
      await result.current.saveGameState(updated);
    });

    const beforeGold = result.current.gameState!.bioMonitor.totalGold;

    await act(async () => {
      await result.current.purchaseReward('reward-2');
    });

    expect(result.current.gameState!.inventory.length).toBe(0);
    expect(result.current.gameState!.bioMonitor.totalGold).toBe(beforeGold);
  });
});
