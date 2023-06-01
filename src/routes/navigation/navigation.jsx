import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.style.scss';
const Navigation = () => {
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
					<Link className='nav-link' to='sign-in'>
						sign-in
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
