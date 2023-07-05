import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import CheckoutItem from '../../comonents/checkout-item/checkout-item.component';

const Checkout = () => {
	const { cartItems, totalCount } = useContext(CartContext);
	return (
		<div className='checkout-container'>
			<div className='checkout-header'>
				<div className='checkout-block'>
					<span>Product</span>
				</div>
				<div className='checkout-block'>
					<span>Description</span>
				</div>
				<div className='checkout-block'>
					<span>Quantity</span>
				</div>
				<div className='checkout-block'>
					<span>Price</span>
				</div>
				<div className='checkout-block'>
					<span>Remove</span>
				</div>
			</div>

			{cartItems.map((item) => {
				return <CheckoutItem key={item.id} item={item} />;
			})}
			<span className='notal'>Total:{totalCount}$$</span>
		</div>
	);
};

export default Checkout;
