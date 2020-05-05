import React from 'react';
import { render } from '@testing-library/react';
import TextArea from './textarea.js';

test('renders a label', () => {
  const { getByText } = render(<TextArea label="TestArea" />);
  const labelElement = getByText(/TestArea/i);
  expect(labelElement).toBeInTheDocument();
});

test('renders a text area input', () => {
  const { getByTestId } = render(<TextArea label="TestArea" />);
  const inputElement = getByTestId('textarea_input');
  expect(inputElement).toBeInTheDocument();
});
