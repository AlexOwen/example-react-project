import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextArea from './textarea.js';
import { act } from 'react-dom/test-utils';

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

test('calls the setValid function', () => {
  const setValid = jest.fn();
  const onChange = jest.fn();

  act(() => {
    const { getByTestId } = render(<TextArea label="TestArea" setValid={ setValid } onChange={ onChange } />);
    const inputElement = getByTestId('textarea_input');
    fireEvent.change(inputElement, {
      target: { value: 'test@test.com' }
    });
  });

  expect(setValid).toHaveBeenCalledTimes(1);
});

test('calls the onChange function', () => {
  const setValid = jest.fn();
  const onChange = jest.fn();

  act(() => {
    const { getByTestId } = render(<TextArea label="TestArea" setValid={ setValid } onChange={ onChange } />);
    const inputElement = getByTestId('textarea_input');
    fireEvent.change(inputElement, {
      target: { value: 't' }
    });
  });

  expect(onChange).toHaveBeenCalledTimes(1);
});