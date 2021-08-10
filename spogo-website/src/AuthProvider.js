import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "./firebase";
import { addUserInfo, getUserDict } from "./UserData";
import SportPositionScreen from "./SignUpLoginFlow/screens/SportPositionScreen/SportPosition";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let history = useHistory();
  const [user, setUser] = useState(null);
  // const [userAuthenticationType, setUserAuthenticationType] = useState("");
  let userAuthenticationType = "";

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (user) {
      if (userAuthenticationType === 'Signup') {
        addUserInfoDictToDB(user)
      }
    }
  };

  const addUserInfoDictToDB = (user) => {
    console.log('Tried to add')
    firebase
      .firestore()
      .collection("Users")
      .doc(user.uid)
      .collection("User Info")
      .doc("Profile Data")
      .set({
        userArray: getUserDict(),
      })
      .then(() => {
        console.log("User added!");
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, loginFailedFunction) => {
          userAuthenticationType = 'Login'
          try {
            await firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                history.push("/create");
              });
            console.log("Successfully Logged In");
          } catch (e) {
            console.log(e);
            loginFailedFunction();
          }
        },
        register: async (email, password, name, signUpFailedFunction) => {
          userAuthenticationType = 'Signup'
          console.log(userAuthenticationType)
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async () => {
                addUserInfo("email", email);
                addUserInfo("name", name);
                addUserInfo("sign-up-finished", false);
                history.push("/auth/sign-up/location-sport-position");
              });
          } catch (e) {
            console.log(e.message);
            if (e.message === "The email address is already in use by another account.") {
              signUpFailedFunction(1)
            } else {
              signUpFailedFunction(0)
            }
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
