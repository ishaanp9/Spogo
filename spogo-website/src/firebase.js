import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAU2jtX5vHJBxnbmp74rcNYrBTd7VcAFGQ",
  authDomain: "athnetmvp.firebaseapp.com",
  projectId: "athnetmvp",
  storageBucket: "athnetmvp.appspot.com",
  messagingSenderId: "945557680753",
  appId: "1:945557680753:web:2165c2d55968fa37a761d0",
  measurementId: "G-4KG7BQMKW3",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
