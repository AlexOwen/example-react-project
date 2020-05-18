import React from 'react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, waitFor } from '@testing-library/react';
import Answers from './answers.js';
import { act } from 'react-dom/test-utils';

window.fetch = () => ({
  json: () => ([
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
  ])
});

test('renders a listing div', async () => {
  let listingElement;
  const history = createMemoryHistory();

  const tree = (
    <Router history={ history }>
      <Answers />
    </Router>
  );

  await act(async () => {
    const { getByTestId } = render(tree);
    listingElement = getByTestId('listing');
  });

  expect(listingElement).toBeInTheDocument();
});

test('renders "No answers yet" when there are no answers returned', async () => {
  let noAnswersElement;
  const history = createMemoryHistory();

  window.fetch = () => ({
    json: () => ([])
  });

  const tree = (
    <Router history={ history }>
      <Answers />
    </Router>
  );

  await act(async () => {
    const { getByText } = render(tree);
    noAnswersElement = getByText('No answers yet');
  });

  expect(noAnswersElement).toBeInTheDocument();
});