import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCDwjSXBdr_PJ-ZzIVSWnNT44BxIxOrMmk",
    authDomain: "crwn-db-89369.firebaseapp.com",
    databaseURL: "https://crwn-db-89369.firebaseio.com",
    projectId: "crwn-db-89369",
    storageBucket: "crwn-db-89369.appspot.com",
    messagingSenderId: "60990710856",
    appId: "1:60990710856:web:a311f24798f01862d4e47d",
    measurementId: "G-4P3TVDKYB3"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return ;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()
    
    if(!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
           await userRef.set({
             displayName,
             email,
             createAt,
             ...additionalData
           })
        } catch (error) {
          console.log('error creating user', error.message);
        }
    }
    return userRef
  }


  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;