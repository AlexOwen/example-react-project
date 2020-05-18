import React from 'react';

/**
 * A submit button
 * 
 * @param { boolean } enabled Whether the button can be clicked
 */
const Submit = ({ enabled }) => {
  return (
    <div className="form-input">
        <input type="submit" disabled={ !enabled } value="Submit" data-testid="submit_button" />
    </div>
  );
};

export default Submit;