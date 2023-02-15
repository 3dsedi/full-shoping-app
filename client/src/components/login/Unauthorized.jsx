import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
      <Link to="/">Go to home page</Link>
    </div>
  );
};

export default Unauthorized;
