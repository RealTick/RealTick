import React from 'react';

const ErrorMessage = ({ error }) => {
  return error ? <div style={{ color: 'red' }}>{error}</div> : null;
};

export default ErrorMessage;