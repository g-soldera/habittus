import React from 'react';
import { vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react-native';
import ShopScreen from '@/app/(tabs)/shop';

vi.mock('@/hooks/use-game-state', () => ({
  useGameState: () => ({
    gameState: {
      character: { id: 'c1', name: 'Test', class: 'netrunner', createdAt: Date.now(), lastLoginAt: Date.now(), loginStreak: 0 },
      bioMonitor: { ram: 50, hardware: 50, cool: 50, credits: 0, totalXp: 0, totalGold: 500 },
      gigs: [],
      bounties: [],
      rewards: [
        { id: 'r1', name: 'Pizza', description: 'Uma pizza', costGold: 100, category: 'food', isCustom: false, createdAt: Date.now() }
      ],
      inventory: [],
      lastUpdatedAt: Date.now(),
    },
    loading: false,
    purchaseReward: vi.fn(),
  }),
}));

describe('ShopScreen', () => {
  it('calls purchaseReward when buy pressed', async () => {
    const { getByTestId } = render(<ShopScreen />);

    const buyButton = getByTestId('reward-r1-buy');
    fireEvent.press(buyButton);

    const mocked = (await import('@/hooks/use-game-state')).useGameState();
    expect(mocked.purchaseReward).toHaveBeenCalledWith('r1');
  });
});
