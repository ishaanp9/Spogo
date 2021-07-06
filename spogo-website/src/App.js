import React, {useEffect} from 'react';

import './App.css';
import LandingPage from './screens/LandingPage/LandingPage';
import Profile from './screens/ProfileScreen/Profile';


function App() {
  let path = window.location.href;

  useEffect(() => {
    path = window.location.href
  }, [])

  return (
    <div className="app">
       {/* {path === 'spogo.us' || path === 'https://spogo.us/' || path === 'https://spogo.us' ? <LandingPage /> : <Profile url={path}/>} */}
       <LandingPage/>
    </div>
  );
}

export default App;
