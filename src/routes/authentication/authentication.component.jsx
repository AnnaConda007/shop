import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
	signInWithGooglePopup,
	createUserDocumentFrom,
	signInWithGoogleRedirect,
	auth,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../comonents/sign-up-form/sign-up-form.component';
import SignInForm from '../../comonents/sign-in-form/sign-in-form.component';
const Authentication = () => {
	useEffect(() => {
		// эта часть в уроке удаляется так как авторизация через вслывающее окно, а не редрект
		const fetchData = async () => {
			const response = await getRedirectResult(auth);
			if (response) {
				const userDocRef = await createUserDocumentFrom(response.user);
			}
		};
		fetchData();
	}, []);

	const logGoogleUser = async () => {
		// эта функция уроке удаляется как и кнопка button
		const { user } = await signInWithGooglePopup();
		console.log(user);
		const userDocRef = await createUserDocumentFrom(user);
	};

	return (
		<div>
			<button onClick={logGoogleUser}> Sign in with Google Popup </button>
			<SignInForm />
			<SignUpForm />
		</div>
	);
};

export default Authentication;
