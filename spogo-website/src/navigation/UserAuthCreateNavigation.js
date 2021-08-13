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
import CreateDescriptionScreen from "../UserProfile/screens/CreateDescriptionScreen/CreateDescriptionScreen";


const UserAuthCreateNavigation = (props) => {
  let userUID = props.uid
  return (
    <Router>
      <AuthProvider>
        <Route exact path="/auth/">
          <Redirect to="auth/sign-in" />
        </Route>
        <Route path={"/auth/sign-in"}>
          <SignInScreen />
        </Route>
        <Route exact path={"/auth/sign-up"}>
          <SignUpScreen />
        </Route>
        <Route exact path={"/auth/sign-up/location-sport-position"}>
          <SportPositionScreen />
        </Route>
        <Route exact path={"/auth/sign-up/socials"}>
          <SocialsScreen />
        </Route>
        <Route exact path="/create/">
          <CreateProfileScreen />
        </Route>
        <Route exact path={'/create/view-items'}>
          <CreateDescriptionScreen/>
        </Route>
      </AuthProvider>
    </Router>
  );
};

export default UserAuthCreateNavigation;
