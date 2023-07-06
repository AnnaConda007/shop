import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyAwqTVAyyStC-DA4tHKryOiyBvxz5mKZZs',
	authDomain: 'crnw-a9407.firebaseapp.com',
	projectId: 'crnw-a9407',
	storageBucket: 'crnw-a9407.appspot.com',
	messagingSenderId: '632706419516',
	appId: '1:632706419516:web:524bb37c601799474bec39',
};
const firebaseApp = initializeApp(firebaseConfig); // создается экземляр класса firebase
const provider = new GoogleAuthProvider(); // определяется ресурс, через который проходит авторизация
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth(); //  вызывается метод проводящий авторизацию, он автоматизирует передачу данных серверу
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // этот метод просто определяет , что нужно открыть модальное окно, вызвать команды метода auth и связать их с ресурсом, определенным в provider
// в компоненте регистрации прописано что после этой функции возвращаются данные c uzer

export const createAuthWithEmailAndPassword = async (email, password) => {
	// регистрация
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password); // вход через гугл
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
	// вход по логин/пароль
	if (!email || !password) return;
	await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const db = getFirestore(); // доступ ко всей бд проекта
export const createUserDocumentFrom = async (userAuth, additionalInfo) => {
	//
	const userDocRef = doc(db, 'users', userAuth.uid); // ссылка в которой указывается что в базу данных должен вносится "user" с сохраненением  userAuth.uid
	const userSnapshot = await getDoc(userDocRef); // получение данных по ссылке , ниже прописано - если пользователь уже есть в базе данных, то просто вернуть данные , если нет, то записать и потом вернуть
	if (!userSnapshot.exists()) {
		// если у пользователя еще нет записанных данных, то есть если свойство user вернулось из компонента регистрации
		const { displayName, email } = userAuth; //   достаются данные с именем и почтой
		const createdAT = new Date(); // сохраняется время регистрации
		try {
			await setDoc(userDocRef, { displayName, email, createdAT, ...additionalInfo }); //записать их, то есть взять ссылку на этого пользователя и добавить в нее displayName, email, createdAT.ю
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef; // в любом случае вернуть ссылку
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey); // забронируй место для коллекции
	const batch = writeBatch(db); // метод который позволяет менять данные в коллекции
	objectsToAdd.forEach((object) => {
		// для каждого объекта в массиве
		const docRef = doc(collectionRef, object.title.toLowerCase()); // задай название подкатегории
		batch.set(docRef, object); // и сами данные
	});
	await batch.commit(); // запусти все это
	console.log('данные записаны в bd');
};

export const getCategoriesAndDocs = async () => {
	const collectionRef = collection(db, 'categories'); //смотрим откуда брать данные
	const q = query(collectionRef); //говорим откуда хотим взять данные
	const querySnapshot = await getDocs(q); //забираем данные
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		// к полученным данным применяем reduce, где acc это пустой объект, а docSnapshot каждый элемент масива, то есть объект с товарами
		const { title, items } = docSnapshot.data(); // достаем из каждого объекта в массиве title и вложенный массив с товарами, то есть items
		acc[title.toLowerCase()] = items; // в объект acc добавляем новое свойство title и присваиваем ему items
		return acc;
	}, {});
	return categoryMap;
};
