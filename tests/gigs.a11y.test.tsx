import React from 'react';
import { render } from '@testing-library/react-native';
import { vi } from 'vitest';

const mockGameState = {
  gigs: [
    { id: 'gig-x', name: 'Test Gig', description: 'desc', xpReward: 10, goldReward: 5, bioMonitorBonus: {}, recurring: true, completedDates: [], createdAt: Date.now() },
  ],
  bounties: [],
};

vi.mock('@/hooks/use-game-state', () => ({
  useGameState: () => ({ gameState: mockGameState, loading: false, completeGig: vi.fn() }),
}));

import GigsScreen from '../app/(tabs)/gigs';

describe('Gigs accessibility', () => {
  it('exposes tab buttons and complete gig button', () => {
    const { getByA11yLabel } = render(<GigsScreen />);

    expect(getByA11yLabel('Abrir aba Gigs')).toBeTruthy();
    expect(getByA11yLabel('Abrir aba Bounties')).toBeTruthy();
    expect(getByA11yLabel('Completar Test Gig')).toBeTruthy();
  });
});
