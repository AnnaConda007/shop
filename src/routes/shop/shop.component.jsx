import { Route, Routes } from 'react-router-dom';
import './shop.styles.scss';
import CategoryESPrevviuw from '../categories-previuw/categories-prewuw.component';
const Shop = () => {
	return (
		<Routes>
			<Route index element={<CategoryESPrevviuw />} />
		</Routes>
	);
};

export default Shop;
