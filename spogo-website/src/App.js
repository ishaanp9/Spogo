import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import ProfileNavigator from "./navigation/ProfileNavigator";
import LandingNavigator from "./navigation/LandingNavigator";
import UserAuthCreateNavigation from "./navigation/UserAuthCreateNavigation";
import { AuthProvider } from "./AuthProvider";
import firebase from "./firebase";

//npm install mdi-react
//npm install react-player
//npm install react-icons --save
//npm install react-router-dom
//npm install --save react-modal
//npm install email-validator
//npm install mixpanel-browser --save
//npm i react-mixpanel
//npm i react-places-autocomplete
//npm install --save rc-progress

//npm run bundle
//firebase deploy

export const UserDataContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  //This variable determines whether firebase on state changed has finished its call
  const [userListenerFinished, setUserListenerFinished] = useState(null);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  const onAuthStateChanged = async (user) => {
    setUserListenerFinished(true)
    if (user) {
      setUser(user);
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        getUserUID: () => {
          if (user === null) {
            return "noUser"
          } else {
            return user.uid
          }
        },
        isUserListenerFinished: () => {
          console.log('listened')
          console.log(userListenerFinished)
          return userListenerFinished
        },
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

const App = () => {
  let path = window.location.href;

  useEffect(() => {
    path = window.location.href;
  }, []);

  const DetermineNavigatorPath = () => {
    if (path.includes("me") || path.includes("descriptions")) {
      return <ProfileNavigator url={path} />;
    } else if (path.includes("auth") || path.includes("create")) {
      return <UserAuthCreateNavigation />;
      // return <UserAuthCreateNavigation uid={ (user === null) ? 'noUser' : user.uid} />;
    } else {
      return <LandingNavigator />;
    }
  };

  return (
    <div className="app">
      <AuthProvider>
        <UserProvider>
          <DetermineNavigatorPath />
        </UserProvider>
      </AuthProvider>

      {/* {path.includes('users') || path.includes('descriptions') ? <ProfileNavigator url={path}/> : <LandingNavigator />} */}
      {/* <AuthProvider>
          <SignInScreen />
        </AuthProvider> */}
    </div>
  );
};

export default App;
