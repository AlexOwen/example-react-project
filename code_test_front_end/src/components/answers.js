import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";

import './answers.css';

const AnswersPage = ({ history }) => {

  const [ answerItems, setAnswerItems ] = useState([]);

  // Fetch the contents of the list from a remote server
  useEffect(() => {
    async function fetchData() { 
      const response = await fetch('http://localhost:3030/answer');
      const jsonResponse = await response.json();
      setAnswerItems(jsonResponse);
    }
    fetchData();
  }, []);

  return (
    <div className="listing">
      <h1>Previous Answers</h1>
        { answerItems.length > 0 &&
          (<>
            { answerItems.map((answer, index) => (
              <div className="answer" key={ 'answer_' + index }>
                <div className="email">{ answer.email }</div>
                <div className="details">
                  <div className="list-option">I would like to hire Alex <strong>{ answer.listOption.toLowerCase() }</strong>.</div>
                  <div className="comment">{ answer.comment }</div>
                </div>
              </div>
              )) }
              <button onClick={ () => history.push('/') }>Answer again</button>
          </>)
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