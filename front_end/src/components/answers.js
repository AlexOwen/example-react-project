import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AnswersList from './answers-list';

import './answers.css';

/**
 * A wrapper for a list of previous answers submitted to the system
 */
const AnswersPage = ({ history }) => {
  const [ answerItems, setAnswerItems ] = useState([]);

  // Fetch the contents of the list from a remote server
  useEffect(() => {
    async function fetchData() {
      let answers = [];

      try {
        const response = await fetch('http://localhost:3001/answers');
        answers = await response.json();
      } catch (err) {
        console.error('Failed to fetch answers', err);
      }

      setAnswerItems(answers);
    }
    fetchData();
  }, []);

  return (
    <div className="listing" data-testid="listing">
      <h1>Previous Answers</h1>

      { answerItems.length > 0 &&
        <>
          <AnswersList answerItems={ answerItems } />
          <button onClick={ () => history.push('/') }>Answer again</button>
        </>
      }
      { answerItems.length === 0 && (
        <>
          <p>No answers yet</p>
          <button onClick={ () => history.push('/') }>Answer now</button>
        </>
      )}
      
    </div>
  );
};

export default withRouter(AnswersPage);