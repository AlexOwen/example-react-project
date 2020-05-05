import React from 'react';
import { render } from '@testing-library/react';
import Select from './select.js';

test('renders a label', () => {
  const { getByText } = render(<Select label="Select Test" />);
  const labelElement = getByText(/Select Test/i);
  expect(labelElement).toBeInTheDocument();
});

test('renders a select input', () => {
  const { getByTestId } = render(<Select />);
  const inputElement = getByTestId('select_input');
  expect(inputElement).toBeInTheDocument();
});
