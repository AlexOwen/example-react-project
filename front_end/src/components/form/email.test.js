import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Email from './email.js';
import { act } from 'react-dom/test-utils';

test('renders a label', () => {
  let labelElement;

  act(() => {
    const { getByText } = render(<Email />);
    labelElement = getByText(/Email/i);
  });

  expect(labelElement).toBeInTheDocument();
});

test('renders an email input', () => {
  let inputElement;

  act(() => {
    const { getByTestId } = render(<Email />);
    inputElement = getByTestId('email_input');
  });

  expect(inputElement).toBeInTheDocument();
});

test('calls the setValid function', () => {
  const setValid = jest.fn();
  const onChange = jest.fn();

  act(() => {
    const { getByTestId } = render(<Email setValid={ setValid } onChange={ onChange } />);
    const inputElement = getByTestId('email_input');
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
    const { getByTestId } = render(<Email setValid={ setValid } onChange={ onChange } />);
    const inputElement = getByTestId('email_input');
    fireEvent.change(inputElement, {
      target: { value: 't' }
    });
  });

  expect(onChange).toHaveBeenCalledTimes(1);
});
