import React from 'react';

const TextArea = ({ setValid, onChange, label }) => {
  const id = 'textarea_' + Math.floor(Math.random() * 100);

  return (
    <div className="form-input">
        <label htmlFor={ id }>{ label }</label>
        <textarea id={ id } onChange={ e => { e.target.value.length > 0 ? setValid(true) : setValid(false); onChange(e.target.value) } } data-testid="textarea_input" ></textarea>
    </div>
  );
};

export default TextArea;