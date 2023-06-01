import './button.styles.scss';
const Button = ({ children, buttonClass, ...otherProps }) => {
	const BUTTON_CLASSES = {
		google: 'google-sign-in',
		inverted: 'inverted',
	};

	return <button className={`button-container ${BUTTON_CLASSES[buttonClass]}`}>{children}</button>;
};

export default Button;
