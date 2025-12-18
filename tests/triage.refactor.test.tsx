import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@/hooks/use-game-state', () => ({
  useGameState: () => ({
    saveUserProfile: vi.fn(),
    userProfile: null,
    loadingProfile: false,
  }),
}));

import TriageScreen from '@/app/triage';
import { Alert } from 'react-native';

describe('Triage - refactor steps and accessibility', () => {
  beforeEach(() => {
    vi.spyOn(Alert, 'alert').mockImplementation(() => {} as any);
  });

  it('renders basic step and validates age', () => {
    const { getByTestId, getByText } = render(<TriageScreen />);

    // fill invalid age
    const ageInput = getByTestId('triage-age');
    fireEvent.changeText(ageInput, '10');

    const next = getByTestId('triage-next-button');
    fireEvent.press(next);

    expect(Alert.alert).toHaveBeenCalled();
  });

  it('navigates steps using next and back buttons', () => {
    const { getByTestId, queryByTestId } = render(<TriageScreen />);

    const next = getByTestId('triage-next-button');
    fireEvent.press(next); // to step 2 (will fail validation unless set, but press should trigger)

    // as validation failed, still on step 1
    expect(queryByTestId('triage-height')).toBeNull();

    // set valid inputs
    fireEvent.changeText(getByTestId('triage-character-name'), 'Test');
    fireEvent.changeText(getByTestId('triage-age'), '25');
    fireEvent.press(next); // move to step 2

    expect(getByTestId('triage-height')).toBeTruthy();

    const back = getByTestId('triage-back-button');
    fireEvent.press(back);

    expect(getByTestId('triage-character-name')).toBeTruthy();
  });
});