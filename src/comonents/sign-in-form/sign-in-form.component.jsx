import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
	signInWithGooglePopup,
	createUserDocumentFrom,
	signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const defaultFormField = {
	// создается объект для значений полей ввода
	email: '',
	password: '',
};
const SignInForm = () => {
	const { setCurrentUser } = useContext(UserContext);

	// ____________________________________блок с обновлением состояний инпутов
	const [formField, setFormField] = useState(defaultFormField); // создается состояние и изначально оно равно объекту с полями ввода, которые равны ""
	const { email, password } = formField; // из объекта достаются отдельные значения
	const handleChange = (e) => {
		const { name, value } = e.target; // из целового события достаются значения  name, value
		setFormField({ ...formField, [name]: value }); //расширение объекта при помощи оператора spread
		// при каждом изменении в инпут вызывается handleChange, который сохраняте данные с именем и значением инпута, далее в setFormField каждый раз создается новая весрия массива formField , далее в массиве находится объект с таким же нахванием как name инпута, и этому свойству объкта присваивается значение равное value. Пример - кликаю на инпут с паролем, создается новый formField, у этого инпута name = password, в массиве находится свойство с таким названием и этому свойству записывается значение value. И теперь состяние инпута обновилось, следует ререндеринг
	};

	// ________________________________________блок с отправкой
	const resetFormFields = () => {
		setFormField(defaultFormField); // в состояние ипутов записывается изначальный объект, где инпуты = пустой строке
	};
	const handleSubmit = async (e) => {
		//  функция для вызова очищения формы, она вызывается на самой форме
		e.preventDefault();

		try {
			const { user } = await signInAuthWithEmailAndPassword(email, password);
			resetFormFields();
			setCurrentUser(user);
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Неверный пароль');
					break;
				case 'auth/user-not-found':
					alert('Неверный email');
					break;
				default:
					console.log(error);
			}
		}
	};
	const signInWithGoogle = async () => {
		// функция авторизации , вызывается, на кнопке
		const { user } = await signInWithGooglePopup(); // вызывается метод, определенный в файле firebase, открывается модальное окно гугл с автоматическим настроенными методами для авторизации, так как функции передается метод auth, signInWithGooglePopup возвращает ответ со всеми аданными пользовается, сохраняется свойство user
		await createUserDocumentFrom(user); // данные из user передаются для дальнейшей обработки в файле в firebase
	};

	return (
		<div className='sign-up-container'>
			<h2>Already have an account</h2>
			<span> Sign up with your email and passwor</span>
			<form onSubmit={handleSubmit}>
				<FormInput label='Email' type='email' value={email} required onChange={handleChange} name='email' />
				<FormInput label='Password' type='password' value={password} required onChange={handleChange} name='password' />
				<div className='buttons-container'>
					<Button type='submit'>Sign in</Button>
					<Button buttonClass={'google'} onClick={signInWithGoogle}>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
