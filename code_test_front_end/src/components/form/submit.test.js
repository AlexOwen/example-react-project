import React from 'react';
import { render } from '@testing-library/react';
import Submit from './submit.js';

test('renders an submit button', () => {
  const { getByTestId } = render(<Submit />);
  const submitElement = getByTestId('submit_button');
  expect(submitElement).toBeInTheDocument();
});
