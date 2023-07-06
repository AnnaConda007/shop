import { useContext } from 'react';
import { CategoryContext } from '../../contexts/category.context';
import CategoryPrevviuw from '../../comonents/category-prevviuw/category-prevviuw.component';

const CategoryESPrevviuw = () => {
	const { categoriesMap } = useContext(CategoryContext);

	return (
		<>
			{Object.keys(categoriesMap).map((title) => {
				//Object.keys( возвращает только заголовки и для каждого заголовка
				const products = categoriesMap[title]; // достаем из массива нужные карточки товаров
				return <CategoryPrevviuw key={title} title={title} products={products} />; // передаем заголовки и карточки дальше CategoryESPrevviuw > CategoryPrevviuw > ProductCard
			})}
		</>
	);
};

export default CategoryESPrevviuw;
