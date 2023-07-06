import { createContext, useEffect, useState } from 'react';
import { getCategoriesAndDocs } from '../utils/firebase/firebase.utils';

export const CategoryContext = createContext({ categoriesMap: {} });

export const CategoryProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		const getCategoryMap = async () => {
			const res = await getCategoriesAndDocs();
			console.log(res);
			setCategoriesMap(res);
		};
		getCategoryMap();
	}, []);

	const value = { categoriesMap };
	return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};
