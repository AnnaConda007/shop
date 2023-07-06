import './category.styles.scss';
import { useContext, useEffect, useState } from 'react';
import { CategoryContext } from '../../contexts/category.context';
import { useParams } from 'react-router-dom';
import ProductCard from '../../comonents/product-card/product-card.component';
const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoryContext);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<div className='category-container'>
			{products && products.map((product) => <ProductCard key={product.id} product={product} />)}
		</div>
	);
};

export default Category;
