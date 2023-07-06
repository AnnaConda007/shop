import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import './navigation.style.scss';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../comonents/cart-icon/cart-icon.component';
import CartDropdown from '../../comonents/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';
const Navigation = () => {
 const { isCartOpen } = useContext(CartContext);

	const { currentUser, setCurrentUser } = useContext(UserContext);
	const signOutHandler = async () => {
		await signOutUser();
		setCurrentUser(null);
	}; 
	return (
		<>
			<div className='navigation'>
				<Link className='logo-container' to=''>
					<CrwnLogo className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='shop'>
						shop
					</Link>
					{currentUser ? (
						<span className='nav-link' to='auth' onClick={signOutHandler}>
							go out
						</span>
					) : (
						<Link className='nav-link' to='auth'>
							sign-in
						</Link>
					)}
					<CartIcon></CartIcon>
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
