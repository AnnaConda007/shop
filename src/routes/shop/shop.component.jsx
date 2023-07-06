import { Fragment, useContext } from 'react';
import { CategoryContext } from '../../contexts/category.context';
import CategoryPrevviuw from '../../comonents/category-prevviuw/category-prevviuw.component';
import './shop.styles.scss';

const Shop = () => {
	const { categoriesMap } = useContext(CategoryContext);

	return (
		<div className='shop-container'>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return <CategoryPrevviuw key={title} title={title} products={products} />;
			})}
		</div>
	);
};

export default Shop;
