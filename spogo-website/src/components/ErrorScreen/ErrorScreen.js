import React from 'react';
import { Link } from 'react-router-dom';

function ErrorScreen() {
  return (
    <>
      <div className="errorContainer">
        <p>Uh Oh, Someting went wrong</p>
        <Link to={'/home'}>
          <button>Go Home</button>
        </Link>
      </div>
    </>
  );
}

export default ErrorScreen;
