import { createContext, useEffect, useState } from 'react';
 import { getCategoriesAndDocs } from '../utils/firebase/firebase.utils';
export const ProductContext = createContext({ products: [] });

export const PRoductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	useEffect(()=>{
		const getCateg = async()=>{
			const res =  await getCategoriesAndDocs()
			console.log(res)
		}
		getCateg()
	},[])
	const value = { products };
	return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
