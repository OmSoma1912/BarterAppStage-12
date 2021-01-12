import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAkwZ7ll6-uqlzsQczPHi9m5mMD2TB2Wdk",
  authDomain: "barterapp-cf366.firebaseapp.com",
  databaseURL: "https://barterapp-cf366.firebaseio.com",
  projectId: "barterapp-cf366",
  storageBucket: "barterapp-cf366.appspot.com",
  messagingSenderId: "100409185300",
  appId: "1:100409185300:web:5d9b38952edb8238fa0301"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore() 