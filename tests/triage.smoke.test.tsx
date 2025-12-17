import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { vi } from 'vitest';

// Mocks
const mockSaveUserProfile = vi.fn().mockResolvedValue(undefined);
const mockReplace = vi.fn();

vi.mock('@/hooks/use-game-state', () => ({
  useGameState: () => ({
    saveUserProfile: mockSaveUserProfile,
  }),
}));

vi.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

import TriageScreen from '../app/triage';

describe('Triage smoke test', () => {
  it('completes triage and navigates to tabs', async () => {
    const { getByPlaceholderText, getByText } = render(<TriageScreen />);

    // Step 1
    fireEvent.changeText(getByPlaceholderText('Digite seu nome...'), 'Tester');
    fireEvent.changeText(getByPlaceholderText('Ex: 25'), '25');
    fireEvent.press(getByText('Próximo →'));

    // Step 2 - Biometrics
    fireEvent.changeText(getByPlaceholderText('Ex: 175'), '175');
    fireEvent.changeText(getByPlaceholderText('Ex: 75'), '75');
    fireEvent.changeText(getByPlaceholderText('Ex: 18'), '18');
    fireEvent.press(getByText('Próximo →'));

    // Step 3 - Objectives
    fireEvent.press(getByText('💪 Saúde Física'));
    fireEvent.press(getByText('Próximo →'));

    // Step 4 - Training
    fireEvent.changeText(getByPlaceholderText('Ex: 3'), '4');
    fireEvent.press(getByText('Strength'));
    fireEvent.press(getByText('Próximo →'));

    // Step 5 - Nutrition
    fireEvent.changeText(getByPlaceholderText('Ex: Balanceada'), 'Balanceada');
    fireEvent.changeText(getByPlaceholderText('Ex: 3'), '3');
    fireEvent.press(getByText('Próximo →'));

    // Step 6 - Study
    fireEvent.changeText(getByPlaceholderText('Ex: 10'), '5');
    fireEvent.changeText(getByPlaceholderText('Ex: 6'), '2');
    fireEvent.press(getByText('Próximo →'));

    // Step 7 - Finance & Habits
    fireEvent.changeText(getByPlaceholderText('Ex: 3000'), '3000');
    fireEvent.changeText(getByPlaceholderText('Ex: 5000'), '0');

    // Submit
    fireEvent.press(getByText('Criar Personagem'));

    await waitFor(() => {
      expect(mockSaveUserProfile).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith('/(tabs)');
    });
  });
});
