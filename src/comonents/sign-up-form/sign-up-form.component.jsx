import { useState, useContext } from 'react';
import { createAuthWithEmailAndPassword, createUserDocumentFrom } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';

// ________________________________блок с обновлением состояний , подробно расписан в SignIn.Component
const defaultFormField = {
	// объект со стартовыми данными состояний
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};
const SignUpForm = () => {
	const {setCurrentUser} = useContext(UserContext)
	const [formField, setFormField] = useState(defaultFormField);
	const { displayName, email, password, confirmPassword } = formField; 
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormField({ ...formField, [name]: value }); //расширение объекта при помощи оператора spread
	};

	//______________________ блок с регистрацией
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			// сравниваются значения двух свойств объекта, они к этому моменту уже обновлены и статичны, так как ипнуты уже обработаны
			alert('password do not match');
			return;
		}
		try {
			const { user } = await createAuthWithEmailAndPassword(email, password);
			setCurrentUser(user) // при клике на "регистрация "  передаются почта и пароль 
			await createUserDocumentFrom(user, { displayName }); // в createUserDocumentFrom передается деструктуризованое свойство объекта displayName
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
				<Button type='submit'>Sign in</Button>
			</form> 
		</div>
	);
};

export default SignUpForm;
