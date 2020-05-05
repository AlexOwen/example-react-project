import React, { useState, useEffect } from 'react';

const DropDown = ({ setValid, onChange, source, label }) => {

  const [ listItems, setListItems ] = useState([]);

  const id = 'select_' + Math.floor(Math.random() * 100);

  // Fetch the contents of the list from a remote server
  useEffect(() => {
    async function fetchData() { 
      const response = await fetch(source);
      const jsonResponse = await response.json();
      setListItems(jsonResponse);
    }
    fetchData();
  }, [ source ]);

  return (
    <div className="form-input">
      <label htmlFor={ id }>{ label }</label>
      <select id={ id } onChange={ e => { e.target.value !== "none" ? setValid(true) : setValid(false); onChange(e.target.value); } } data-testid="select_input" >
        <option value="none" key="null_option">Please choose...</option>
        {listItems.map((item, index) => (
          <option value={ item } key={ 'option_' + index }>{ item }</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;