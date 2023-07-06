import { Route, Routes } from 'react-router-dom';
import './shop.styles.scss';
import CategoryESPrevviuw from '../categories-previuw/categories-prewuw.component';
import Category from '../category/category.component';
const Shop = () => {
	return (
		<Routes>
			<Route index element={<CategoryESPrevviuw />} />
			<Route path=':category' element={<Category />} />
			{/* path=':category это спец динамический параметр, который отслеживает адрес строку и передает кажде значение дальще '*/}
		</Routes>
	);
};

export default Shop;

//CategoryESPrevviuw > CategoryPrevviuw > ProductCard
