import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from './select.js';
import { act } from 'react-dom/test-utils';

window.fetch = () => ({
  json: () => ([
    'option1',
    'option2',
    'option3',
  ])
});

test('renders a label', async () => {
  let labelElement;

  await act(async () => {
    const { getByText } = render(<Select label="Select Test" />);
    labelElement = getByText(/Select Test/i);
  });

  expect(labelElement).toBeInTheDocument();
});

test('renders a select input', async () => {
  let inputElement;

  await act(async () => {
    const { getByTestId } = render(<Select />);
    inputElement = getByTestId('select_input');
  });

  expect(inputElement).toBeInTheDocument();
});

test('calls the setValid function', async () => {
  const setValid = jest.fn();
  const onChange = jest.fn();

  await act(async () => {
    const { getByTestId } = render(<Select label="Select Test"  setValid={ setValid } onChange={ onChange } />);
    const inputElement = getByTestId('select_input');
    fireEvent.change(inputElement, {
      target: { value: 'testValue' }
    });
  });

  expect(setValid).toHaveBeenCalledTimes(1);
});

test('calls the onChange function', async () => {
  const setValid = jest.fn();
  const onChange = jest.fn();

  await act(async () => {
    const { getByTestId } = render(<Select label="Select Test"  setValid={ setValid } onChange={ onChange } />);
    const inputElement = getByTestId('select_input');
    fireEvent.change(inputElement, {
      target: { value: 'testValue' }
    });
  });

  expect(onChange).toHaveBeenCalledTimes(1);
});