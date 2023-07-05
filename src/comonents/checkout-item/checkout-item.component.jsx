import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
const CheckoutItem = ({ item }) => {
	const { clearItemFromCart, remmoveToCart, addItemToCart } = useContext(CartContext);
	const plusHandler = () => {
		addItemToCart(item);
	};
	const minusHandler = () => {
		remmoveToCart(item);
	};
	const clearHendler = (item) => {
		clearItemFromCart(item);
	};
	const { name, imageUrl, price, quantity } = item;
	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt={name} />
			</div>
			<span className='name'>{name}</span>

			<span className='quantity'>
				<div className='arrow' onClick={minusHandler}>
					{' '}
					&#10094;
				</div>
				<span className='value'> {quantity}</span>
				<div className='arrow' onClick={plusHandler}>
					{' '}
					&#10095;
				</div>
			</span>
			<span className='price'>{price}</span>
			<div
				className='remove-button'
				onClick={() => {
					clearHendler(item);
				}}
			>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
