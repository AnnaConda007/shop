import { Fragment, useContext } from 'react';
import { CategoryContext } from '../../contexts/category.context';
import ProductCard from '../../comonents/product-card/product-card.component';
import './shop.styles.scss';

const Shop = () => {
	const { categoriesMap } = useContext(CategoryContext);

	return (
		<>
			{Object.keys(categoriesMap).map((title) => {
				return (
					<Fragment key={title}>
						<h2>{title}</h2>
						<div className='products-container'>
							{categoriesMap[title].map((product) => {
								return <ProductCard key={product.id} product={product} />;
							})}
						</div>
					</Fragment>
				);
			})}
		</>
	);
};

export default Shop;
