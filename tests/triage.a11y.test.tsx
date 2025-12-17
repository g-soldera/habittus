import React from 'react';
import { render } from '@testing-library/react-native';
import { vi } from 'vitest';

vi.mock('@/hooks/use-game-state', () => ({
  useGameState: () => ({ saveUserProfile: vi.fn() }),
}));

import TriageScreen from '../app/triage';

describe('Triage accessibility', () => {
  it('exposes key accessibility labels on initial step', () => {
    const { getByA11yLabel } = render(<TriageScreen />);

    expect(getByA11yLabel('Nome do Personagem')).toBeTruthy();
    expect(getByA11yLabel('Idade')).toBeTruthy();
    expect(getByA11yLabel('Sexo Masculino')).toBeTruthy();
    expect(getByA11yLabel('Sexo Feminino')).toBeTruthy();
    expect(getByA11yLabel('Próximo')).toBeTruthy();
  });
});
