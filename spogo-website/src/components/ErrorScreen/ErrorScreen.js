import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorScreen.css';

function ErrorScreen() {
  return (
    <div className='bodyContainer'>
      <div className="errorContainer">
        <p>Uh Oh, Someting went wrong!</p>
        <Link className='errorLinkButton' to={'/home'}>
          <button className="errorButton">Go Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorScreen;
