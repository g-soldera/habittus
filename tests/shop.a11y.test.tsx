import React from 'react';
import { render } from '@testing-library/react-native';
import { vi } from 'vitest';

const mockGameState = {
  rewards: [
    { id: 'reward-1', name: 'Ingresso de Cinema', description: '', costGold: 100, category: 'leisure' },
  ],
  bioMonitor: { totalGold: 1000, totalXp: 0, ram: 0, hardware: 0, cool: 0, credits: 0 },
};

vi.mock('@/hooks/use-game-state', () => ({
  useGameState: () => ({ gameState: mockGameState, loading: false, purchaseReward: vi.fn() }),
}));

import ShopScreen from '../app/(tabs)/shop';

describe('Shop accessibility', () => {
  it('exposes add reward and category filters and buy button labels', () => {
    const { getByA11yLabel } = render(<ShopScreen />);

    expect(getByA11yLabel('Adicionar recompensa')).toBeTruthy();
    expect(getByA11yLabel('Filtrar por categoria leisure')).toBeTruthy();
    expect(getByA11yLabel('Comprar Ingresso de Cinema')).toBeTruthy();
  });
});
