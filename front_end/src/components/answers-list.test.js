import React from 'react';
import { render } from '@testing-library/react';
import AnswersList from './answers-list.js';
import { act } from 'react-dom/test-utils';

const answers = [
  {
    id: "id_001",
    email: "email@test.com",
    listOption: "Lots",
    comment: "This is a string."
  },
  {
    id: "id_002",
    email: "test@email.com",
    listOption: "Loads",
    comment: "This is a multi\nline string."
  }
];

test('renders the correct emails', async () => {
  let emailElement1, emailElement2;

  await act(async () => {
    const { getByText } = render(<AnswersList answerItems={ answers } />);
    emailElement1 = getByText('email@test.com');
    emailElement2 = getByText('test@email.com');
  });

  expect(emailElement1).toBeInTheDocument();
  expect(emailElement2).toBeInTheDocument();
});

test('renders the correct listOptions', async () => {
  let listOptionElement1, listOptionElement2;

  await act(async () => {
    const { getByText } = render(<AnswersList answerItems={ answers } />);
    listOptionElement1 = getByText('lots');
    listOptionElement2 = getByText('loads');
  });

  expect(listOptionElement1).toBeInTheDocument();
  expect(listOptionElement2).toBeInTheDocument();
});

test('renders the correct comments', async () => {
  let commentElement1, commentElement2;

  await act(async () => {
    const { getByText } = render(<AnswersList answerItems={ answers } />);
    commentElement1 = getByText('This is a string.');
    commentElement2 = getByText('This is a multi line string.');
  });

  expect(commentElement1).toBeInTheDocument();
  expect(commentElement2).toBeInTheDocument();
});