import React from 'react';

const AnswersList = ({ answerItems }) => {
  return (
    <>
      { answerItems.map((answer, index) => (
        <div className="answer" key={ 'answer_' + index }>
          <div className="email">{ answer.email }</div>
          <div className="details">
            <div className="list-option">I would like to hire Alex <strong>{ answer.listOption.toLowerCase() }</strong>.</div>
            <div className="comment">{ answer.comment }</div>
          </div>
        </div>
      ))}
    </>
  )
};

export default AnswersList;