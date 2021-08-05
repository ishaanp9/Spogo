import React, { createContext, useState } from "react";
import firebase from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, loginFailedFunction) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log("Successfully Logged In");
          } catch (e) {
            console.log(e);
            loginFailedFunction()
          }
        },
        register: async (email, password, name, navigation) => {
          try {
          } catch (e) {}
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
            console.log("Successfully Logged Out");
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
