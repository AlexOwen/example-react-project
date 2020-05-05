import React from 'react';
import { render } from '@testing-library/react';
import Email from './email.js';

test('renders a label', () => {
  const { getByText } = render(<Email />);
  const labelElement = getByText(/Email/i);
  expect(labelElement).toBeInTheDocument();
});

test('renders an email input', () => {
  const { getByTestId } = render(<Email />);
  const inputElement = getByTestId('email_input');
  expect(inputElement).toBeInTheDocument();
});
