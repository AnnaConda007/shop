import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithRedirect,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyAwqTVAyyStC-DA4tHKryOiyBvxz5mKZZs',
	authDomain: 'crnw-a9407.firebaseapp.com',
	projectId: 'crnw-a9407',
	storageBucket: 'crnw-a9407.appspot.com',
	messagingSenderId: '632706419516',
	appId: '1:632706419516:web:524bb37c601799474bec39',
};
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // всплывающее окно

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider); // перенаправление на страницу гугл для авторизации

export const db = getFirestore(); // доступ ко всей бд проекта
export const createUserDocumentFrom = async (userAuth, additionalInfo) => {
	const userDocRef = doc(db, 'users', userAuth.uid); // создание ссылки на данные конкретного пользователя
	const userSnapshot = await getDoc(userDocRef); // получение данных по ссылке
	if (!userSnapshot.exists()) {
		// если у пользователя еще нет записанных данных
		const { displayName, email } = userAuth;
		const createdAT = new Date();
		try {
			await setDoc(userDocRef, { displayName, email, createdAT, ...additionalInfo}); //записать их
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef; // в любом случае вернуть ссылку
};

export const createAuthWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};
