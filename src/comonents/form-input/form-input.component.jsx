import './form-input.styles.scss';
const FormInput = ({ label, ...props }) => {
	return (
		<div className='group'>
			<input className='form-input' {...props}></input>
			{label && <label className={`${props.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>}
		</div>
	);
};
export default FormInput;
