import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import useValidity from '../hooks/useValidity.js';

import Email from './form/email.js';
import Select from './form/select.js';
import TextArea from './form/textarea.js';
import Submit from './form/submit.js';
import './form.css';

/**
 * A form to submit answers to the back end
 * 
 * @param { object } history The router history
 */
function FormPage({ history }) {

  // Store the form data in the state
  const [ formData, setFormData ] = useState({});

  // Store whether the form is valid
  const [ formValid, setFormValid ] = useState(false);

  // Check whether each field is valid
  const [ setEmailValid, setSelectValid, setCommentValid ] = useValidity([ 'email', 'select', 'comment' ], setFormValid);

  // When a value changes in the form, update the state
  function updateFormData(key, value) {
    setFormData({ ...formData, ...{[key]: value} });
  }

  // The form's submit method
  async function submitForm(data, url) {
    await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    history.push('/answers');
  }

  return (
    <>
      <form onSubmit={ (e) => { e.preventDefault(); submitForm(formData, 'http://localhost:3001/answers') } }>
        <p>Hi!</p>
        <p>Thank you for taking the time to judge me. Please fill in the form below as honestly as possible.</p>
        <Email setValid={ setEmailValid } onChange={ value => { updateFormData('email', value) } }></Email>
        <Select label="How much do you like chocolate?" source="http://localhost:3001/list" setValid={ setSelectValid } onChange={ value => { updateFormData('listOption', value) } } />
        <TextArea label="Please design some ASCII art of an animal that describes your mood" setValid={ setCommentValid } onChange={ value => { updateFormData('comment', value) } } ></TextArea>
        <Submit enabled={ formValid } formData={ formData }></Submit>
      </form>
    </>
  );

}

export default withRouter(FormPage);
