import React, { createContext, useState } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import firebase from "./firebase";
import {
  addUserInfo,
  addUserInfoToHolder,
  getUserHolderDict,
} from "./UserData";
import SportPositionScreen from './SignUpLoginFlow/screens/SportPositionScreen/SportPosition'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let history = useHistory();
  const [user, setUser] = useState(null);
  const [signInNavigation, setSignInNavigation] = useState(false);
  const [signUpNavigation, setSignUpNavigation] = useState(false);

  // if (signUpNavigation) {
  //   return (
  //     <Router>
  //       <Redirect to={"/auth/sign-up/location-sport-position"} />
  //       <Switch>
  //         <Route exact path={"/auth/sign-up/location-sport-position"}>
  //           <SportPositionScreen />
  //         </Route>
  //       </Switch>
  //     </Router>
  //   );
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, loginFailedFunction) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log("Successfully Logged In");
            // window.location.assign("/create")
          } catch (e) {
            console.log(e);
            loginFailedFunction();
          }
        },
        register: async (email, password, name) => {
          try {
            // await firebase.auth().createUserWithEmailAndPassword(email, password)
            addUserInfoToHolder('email', email);
            addUserInfoToHolder('name', name);
            console.log(getUserHolderDict())
            history.push('/auth/sign-up/location-sport-position')
            // window.location.assign('/auth/sign-up/location-sport-position')
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
            console.log("Successfully Logged Out");
            window.location.assign("/auth/sign-in");
          } catch (e) {
            console.log("Logout Failed");
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
