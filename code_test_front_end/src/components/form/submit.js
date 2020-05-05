import React from 'react';

const Submit = ({ enabled }) => {

  return (
    <div className="form-input">
        <input type="submit" disabled={ !enabled } value="Submit" data-testid="submit_button" />
    </div>
  );
};

export default Submit;