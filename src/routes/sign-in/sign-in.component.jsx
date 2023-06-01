import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
	signInWithGooglePopup,
	createUserDocumentFrom,
	signInWithGoogleRedirect,
	auth,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../comonents/sign-up-form/sign-up-form.component';

const SignIn = () => {
	useEffect(() => {
		const fetchData = async () => {
			const response = await getRedirectResult(auth);
			if (response) {
				const userDocRef = await createUserDocumentFrom(response.user);
			}
		};
		fetchData();
	}, []);

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		console.log(user);
		const userDocRef = await createUserDocumentFrom(user);
	};

	return (
		<div>
			{' '}
			<h1>sign</h1>
			<button onClick={logGoogleUser}> Sign in with Google Popup </button>
			<button onClick={signInWithGoogleRedirect}> Sign in with Google Redirect</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
