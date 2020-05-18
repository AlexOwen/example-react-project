import React, { useState, useEffect } from 'react';

/**
 * A select input element that gets its values from a URL
 * 
 * @param { function } setValid Function to call when the input to the field is valid
 * @param { function } onChange Function to call when the input changes
 * @param { string } source The URL to fetch the items from
 * @param { string } label The label text for the input
 */
const DropDown = ({ setValid, onChange, source, label }) => {

  const [ listItems, setListItems ] = useState([]);

  const id = 'select_' + Math.floor(Math.random() * 100);

  // Fetch the contents of the list from a remote server
  useEffect(() => {
    async function fetchData() {
      let items = [];
      try {
        const response = await fetch(source);
        items = await response.json();
      } catch (err) {
        console.error('Failed to fetch list items', err);
      }
      setListItems(items);
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