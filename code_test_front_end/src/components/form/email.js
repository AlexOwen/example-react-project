import React from 'react';

const Email = ({ setValid, onChange }) => {

  const id = 'comment_' + Math.floor(Math.random() * 100);

  return (
    <div className="form-input">
        <label htmlFor={ id }>Email</label>
        <input type="email" id={ id } onChange={ e => { e.target.checkValidity() ? setValid(true) : setValid(false); onChange(e.target.value); } } data-testid="email_input" />
    </div>
  );
};

export default Email;