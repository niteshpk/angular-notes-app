import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCYTMgnRit31gXn2gT0dRCoRbL9E1LXV30",
  authDomain: "notes-app-c5baa.firebaseapp.com",
  databaseURL: "https://notes-app-c5baa.firebaseio.com",
  projectId: "notes-app-c5baa",
  storageBucket: "notes-app-c5baa.appspot.com",
  messagingSenderId: "9423340904",
  appId: "1:9423340904:web:dcc9287a5b26b3258302dd",
  measurementId: "G-VZBLV4WD6F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
