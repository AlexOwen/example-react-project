import React from 'react';

/**
 * A text area input element
 * 
 * @param { function } setValid Function to call when the input to the field is valid
 * @param { function } onChange Function to call when the input changes
 * @param { string } label The label text for the input
 */
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