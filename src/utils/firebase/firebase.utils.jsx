import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAwqTVAyyStC-DA4tHKryOiyBvxz5mKZZs",
  authDomain: "crnw-a9407.firebaseapp.com",
  projectId: "crnw-a9407",
  storageBucket: "crnw-a9407.appspot.com",
  messagingSenderId: "632706419516",
  appId: "1:632706419516:web:524bb37c601799474bec39"
};
 
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);