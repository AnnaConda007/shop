import {  useContext } from 'react';
import { CategoryContext } from '../../contexts/category.context'; 
import CategoryPrevviuw from '../../comonents/category-prevviuw/category-prevviuw.component';
 
const CategoryESPrevviuw = () => {
	const { categoriesMap } = useContext(CategoryContext);

	return (
		<>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return <CategoryPrevviuw key={title} title={title} products={products} />;
			})}
		</>
	);
};

export default CategoryESPrevviuw;
