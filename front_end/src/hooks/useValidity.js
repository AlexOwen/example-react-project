import { useState, useEffect } from 'react';

/**
 * A custom hook to monitor validity of fields in a form.
 * This is a little contrived, so should just be taken as an example.
 * 
 * @param { Array } fieldNames The names of the fields to be watched
 * @param { function } setFormValid The function to set the Form's validity
 */
function useValidity(fieldNames, setFormValid) {
  // Initially, set all fields to invalid
  const [validity, setValidity] = useState(fieldNames.reduce((obj, name) => {
    return {
      ...obj,
      [name]: false,
    };
  }, {}));

  useEffect(() => 
    Object.keys(validity).every(value => validity[value] === true) ? setFormValid(true) : setFormValid(false)
  , [ validity ])

  // Return onChange functions for each field
  return fieldNames.map((name) => {
    return (value) => {
      setValidity({
        ...validity,
        [name]: value,
      });
    };
  });
}

export default useValidity;