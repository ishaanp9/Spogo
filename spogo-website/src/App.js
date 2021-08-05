import React, { useEffect } from "react";

import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProfileNavigator from "./navigation/ProfileNavigator";
import LandingNavigator from "./navigation/LandingNavigator";
import ProfileHeader from "./UserProfile/components/ProfileHeader/ProfileHeader";
import CreateProfile from "./UserProfile/screens/CreateProfileScreen/CreateProfile";
import SignUpScreen from './SignUpLoginFlow/screens/SignUpScreen/SignUpScreen';
import SignInScreen from './SignUpLoginFlow/screens/SignInScreen/SignInScreen';
import SportPosition from "./SignUpLoginFlow/screens/SportPositionScreen/SportPosition";
import SocialsScreen from "./SignUpLoginFlow/screens/SocialsScreen/SocialsScreen";
import Profile from "./UserProfile/screens/ProfileScreen/Profile";
import {AuthProvider} from './AuthProvider';


//npm install mdi-react
//npm install react-player
//npm install react-icons --save
//npm install react-router-dom
//npm install --save react-modal
//npm install email-validator
//npm install mixpanel-browser --save
//npm i react-mixpanel

//npm run bundle
//firebase deploy

function App() {
  let path = window.location.href;

  useEffect(() => {
    path = window.location.href;
  }, []);

  return (
    <div className="app">

       {/* {path === 'spogo.us' || path === 'https://spogo.us/' || path === 'https://spogo.us' ? <LandingPage /> : <Profile url={path}/>}
       {path.includes('users') || path.includes('descriptions') ? <ProfileNavigator url={path}/> : <LandingNavigator />} */}
       {/* {path.includes('users') || path.includes('descriptions') ? <ProfileNavigator url={path}/> : <LandingNavigator />} */}
        <AuthProvider>
          <CreateProfile/>
        </AuthProvider>
    </div>
    // <>
    //   <CreateProfile />
    // </>
  );
}

export default App;
