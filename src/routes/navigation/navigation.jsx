import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import './navigation.style.scss';
import { signOutUser } from '../../utils/firebase/firebase.utils';
const Navigation = () => {
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
					<Link className='nav-link' to=''>
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
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
