import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCjI-jq0zxc9GjNfuBC6dPfT4epcH8P7e4",
    authDomain: "todoapp-v2-8701c.firebaseapp.com",
    projectId: "todoapp-v2-8701c",
    storageBucket: "todoapp-v2-8701c.appspot.com",
    messagingSenderId: "688772549322",
    appId: "1:688772549322:web:b468f8fa8910a2416f4233"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export { db };