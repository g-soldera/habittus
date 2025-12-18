import React from 'react';
import { render } from '@testing-library/react-native';
import { describe, it, expect } from 'vitest';

import TriageScreen from '@/app/triage';

describe('Triage accessibility basics', () => {
  it('renders key inputs with accessibility attributes', () => {
    const { getByTestId } = render(<TriageScreen />);

    const name = getByTestId('triage-character-name');
    const age = getByTestId('triage-age');
    const next = getByTestId('triage-next-button');

    expect(name.props.accessibilityLabel).toBeDefined();
    expect(age.props.accessibilityLabel).toBeDefined();
    expect(next.props.accessibilityRole).toBe('button');
  });
});
