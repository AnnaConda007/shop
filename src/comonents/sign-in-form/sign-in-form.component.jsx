import { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFrom } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
const defaultFormField = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formField, setFormField] = useState(defaultFormField);
	const { email, password } = formField;
	console.log(formField);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormField({ ...formField, [name]: value }); //расширение объекта при помощи оператора spread
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			resetFormFields();
		} catch (error) {}
	};
	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFrom(user);
	};
	const resetFormFields = () => {
		setFormField(defaultFormField);
	};
	return (
		<div className='sign-up-container'>
			<h2>Already have an account</h2>
			<span> Sign up with your email and passwor</span>
			<form onSubmit={handleSubmit}>
				<FormInput label='Email' type='email' value={email} required onChange={handleChange} name='email' />
				<FormInput label='Password' type='password' value={password} required onChange={handleChange} name='password' />

				<Button type='submit'>Sign in</Button>
				<Button onClick={signInWithGoogle}>Google sign in</Button>
			</form>
		</div>
	);
};

export default SignInForm;
