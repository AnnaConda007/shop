import { useState } from 'react';
import { createAuthWithEmailAndPassword, createUserDocumentFrom } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
const defaultFormField = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formField, setFormField] = useState(defaultFormField);
	const { displayName, email, password, confirmPassword } = formField;
	console.log(formField);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormField({ ...formField, [name]: value }); //расширение объекта при помощи оператора spread
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('password do not match');
			return;
		}
		try {
			const { user } = await createAuthWithEmailAndPassword(email, password);
			await createUserDocumentFrom(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('email already in use');
			} else {
				console.log(error);
			}
		}
	};

	const resetFormFields = () => {
		setFormField(defaultFormField);
	};
	return (
		<div className='sign-up-container'>
			<h2>Don't have an account</h2>
			<span> Sign up with your email and passwor</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display name'
					type='text'
					value={displayName}
					required
					onChange={handleChange}
					name='displayName'
				/>
				<FormInput label='Email' type='email' value={email} required onChange={handleChange} name='email' />
				<FormInput label='Password' type='password' value={password} required onChange={handleChange} name='password' />
				<FormInput
					label='Confirm password'
					type='password'
					value={confirmPassword}
					required
					onChange={handleChange}
					name='confirmPassword'
				/>

				<button type='submit'></button>
			</form>
		</div>
	);
};

export default SignUpForm;
