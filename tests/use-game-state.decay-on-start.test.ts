import { describe, it, expect, vi, beforeEach } from 'vitest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook } from '@testing-library/react-hooks';
import { useGameState } from '@/hooks/use-game-state';

vi.mock('@react-native-async-storage/async-storage', () => ({
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}));

import { createDefaultCharacter, createDefaultBioMonitor, createDefaultGameState } from '@/lib/mock-data';

describe('useGameState startup decay', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as any).mockReset();
    (AsyncStorage.setItem as any).mockReset();
  });

  it('applies daily decay when lastUpdatedAt is older than today', async () => {
    const char = createDefaultCharacter('T', 'netrunner');
    const bio = createDefaultBioMonitor();
    bio.ram = 20;
    bio.hardware = 30;
    bio.cool = 40;

    const oldState = createDefaultGameState(char, bio);
    // set lastUpdatedAt 3 days ago
    oldState.lastUpdatedAt = Date.now() - 3 * 24 * 3600 * 1000;

    (AsyncStorage.getItem as any).mockResolvedValueOnce(JSON.stringify(oldState));

    const { result, waitForNextUpdate } = renderHook(() => useGameState());
    await waitForNextUpdate();

    // After load and decay apply, the ram/hardware/cool should be less
    const newRam = result.current.gameState!.bioMonitor.ram;
    expect(newRam).toBeLessThan(20);
    expect((AsyncStorage.setItem as any)).toHaveBeenCalled();
  });
});