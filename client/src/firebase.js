import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyB_M57XkMRunIKxSMtb-U7Azh7BwizT44w",
  authDomain: "btg-admin-1.firebaseapp.com",
  databaseURL: "https://btg-admin-1.firebaseio.com",
  projectId: "btg-admin-1",
  storageBucket: "btg-admin-1.appspot.com",
  messagingSenderId: "287212608439",
  appId: "1:287212608439:web:e0ea501a00efe140882632",
  measurementId: "G-WJ927YBH9H"
};
firebase.initializeApp(config);
export default firebase;
