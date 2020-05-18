import React from 'react';
import { render } from '@testing-library/react';
import Submit from './submit.js';
import { act } from 'react-dom/test-utils';

test('renders an submit button', () => {
  let submitElement;

  act(() => {
    const { getByTestId } = render(<Submit />);
    submitElement = getByTestId('submit_button');
  });
  
  expect(submitElement).toBeInTheDocument();
});
