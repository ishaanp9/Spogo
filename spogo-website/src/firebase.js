import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAU2jtX5vHJBxnbmp74rcNYrBTd7VcAFGQ",
  authDomain: "athnetmvp.firebaseapp.com",
  projectId: "athnetmvp",
  storageBucket: "athnetmvp.appspot.com",
  messagingSenderId: "945557680753",
  appId: "1:945557680753:web:2165c2d55968fa37a761d0",
  measurementId: "G-4KG7BQMKW3",
};

const firebaseSpogoWaitlistConfig = {
  apiKey: "AIzaSyD35_UBBCBDAfrqolB6rukORo7Rw2Lfkbg",
  authDomain: "spogo-waitlist.firebaseapp.com",
  projectId: "spogo-waitlist",
  storageBucket: "spogo-waitlist.appspot.com",
  messagingSenderId: "926867244107",
  appId: "1:926867244107:web:01b8f13665182fd825f9ce",
};

// firebase.initializeApp(firebaseConfig, "[DEFAULT]");
firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseSpogoWaitlistConfig, 'secondary');

export default firebase;
