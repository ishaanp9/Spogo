import React, { useState, useEffect } from "react";
import "./App.css";
import ProfileNavigator from "./navigation/ProfileNavigator";
import LandingNavigator from "./navigation/LandingNavigator";
import UserAuthCreateNavigation from "./navigation/UserAuthCreateNavigation";
import ProfileHeader from "./UserProfile/components/ProfileHeader/ProfileHeader";
import SignUpScreen from "./SignUpLoginFlow/screens/SignUpScreen/SignUpScreen";
import SignInScreen from "./SignUpLoginFlow/screens/SignInScreen/SignInScreen";
import CreateProfile from "./UserProfile/screens/CreateProfileScreen/CreateProfile";
import SportPosition from "./SignUpLoginFlow/screens/SportPositionScreen/SportPosition";
import SocialsScreen from "./SignUpLoginFlow/screens/SocialsScreen/SocialsScreen";
import Profile from "./UserProfile/screens/ProfileScreen/Profile";
import { AuthProvider } from "./AuthProvider";
import { getUserDict, setUserDict } from "./UserData";
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


//npm run bundle
//firebase deploy

const App = () => {
  let path = window.location.href;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  const onAuthStateChanged = async (user) => {
    console.log(user)
    if (user) {
      setUser(user);
    }
  };

  const getDBUserInfoDict = async (user) => {
    let dbPath = firebase
      .firestore()
      .collection("Users")
      .doc(user.uid)
      .collection("User Info");
    let profileData = dbPath.doc("Profile Data");
    await profileData
      .get()
      .then( async (doc) => {
        if (doc.exists) {
          console.log('Got user data')
          // setUserDict(doc.data());
          console.log(getUserDict())
        } else {
          console.log("Doc doesn't exist")
          // await addUserInfoDict()
        }
      })
      .catch((error) => {
        console.log("Error getting user info document:", error);
      });
    // setUserInfoDictHolder(getUserDict());
  };

  useEffect(() => {
    path = window.location.href;
  }, []);

  const DetermineNavigatorPath = () => {
    if (path.includes("users") || path.includes("descriptions")) {
      return <ProfileNavigator url={path} />;
    } else if (path.includes("auth") || path.includes("create")) {
      return <UserAuthCreateNavigation uid={ (user === null) ? 'noUser' : user.uid} />;
      // return <UserAuthCreateNavigation uid={ (user === null) ? 'noUser' : user.uid} />;
    } else {
      return <LandingNavigator />;
    }
  };

  return (
    <div className="app">
      <AuthProvider>
        <DetermineNavigatorPath />
      </AuthProvider>

      {/* {path.includes('users') || path.includes('descriptions') ? <ProfileNavigator url={path}/> : <LandingNavigator />} */}
      {/* <AuthProvider>
          <SignInScreen />
        </AuthProvider> */}
    </div>
  );
};

export default App;
