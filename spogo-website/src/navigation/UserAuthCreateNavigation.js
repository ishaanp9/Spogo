import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUpScreen from "../SignUpLoginFlow/screens/SignUpScreen/SignUpScreen";
import SignInScreen from "../SignUpLoginFlow/screens/SignInScreen/SignInScreen";
import SportPositionScreen from "../SignUpLoginFlow/screens/SportPositionScreen/SportPosition";
import SocialsScreen from "../SignUpLoginFlow/screens/SocialsScreen/SocialsScreen";
import CreateProfileScreen from "../UserProfile/screens/CreateProfileScreen/CreateProfile";

import { AuthProvider } from "../AuthProvider";

const UserAuthCreateNavigation = (props) => {
  let userUID = props.uid
  return (
    <Router>
      <AuthProvider>
        <Route exact path="/auth/">
          <Redirect to="auth/sign-in" />
        </Route>
        <Route path={"/auth/sign-in"}>
          <SignInScreen userUID={userUID}/>
        </Route>
        <Route exact path={"/auth/sign-up"}>
          <SignUpScreen userUID={userUID}/>
        </Route>
        <Route exact path={"/auth/sign-up/location-sport-position"}>
          <SportPositionScreen userUID={userUID}/>
        </Route>
        <Route exact path={"/auth/sign-up/socials"}>
          <SocialsScreen userUID={userUID}/>
        </Route>
        <Route path="/create/">
          <CreateProfileScreen userUID={userUID} />
        </Route>
      </AuthProvider>
    </Router>
  );
};

export default UserAuthCreateNavigation;
