import { Fragment, useContext } from 'react';
import { CategoryContext } from '../../contexts/category.context';
import ProductCard from '../../comonents/product-card/product-card.component';
import './shop.styles.scss';

const Shop = () => {
	const { categoriesMap } = useContext(CategoryContext);

	return (
		<>
			{Object.keys(categoriesMap).map((title) => {
				// говорим, что в каждом элементе массива только для свойства title нужно вызывать функцию, которая  возвращет div с заголовком
				return (
					<Fragment key={title}>
						<h2>{title}</h2>
						<div className='products-container'>
							{categoriesMap[title].map((product) => {
								// и потом для свойства у которого заголовок будет совпадать с активным title вызвать фкнкцию, которая передает данные в следу пропс
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
