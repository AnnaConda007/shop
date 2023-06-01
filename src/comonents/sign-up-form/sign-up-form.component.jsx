import { useState } from 'react';

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
	return (
		<div>
			<h1> Sign up with your email and passwor</h1>
			<form onSubmit={() => {}}>
				<label htmlFor=''>Display name</label>
				<input required type='text' onChange={handleChange} name='displayName' value={displayName}></input>

				<label htmlFor=''>Email</label>
				<input required type='email' onChange={handleChange} name='email' value={email}></input>

				<label htmlFor=''>Password</label>
				<input required type='password' onChange={handleChange} name='password' value={password}></input>

				<label htmlFor=''>Confirm password</label>
				<input required type='password' onChange={handleChange} name='confirmPassword' value={confirmPassword}></input>
				<button type='submit'></button>
			</form>
		</div>
	);
};

export default SignUpForm;