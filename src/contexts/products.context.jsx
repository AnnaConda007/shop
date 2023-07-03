import { createContext, useState } from 'react';
import PRODUCTS from '../sh-data.json';

export const ProductContext = createContext({ products: [] });

export const PRoductProvider = ({ children }) => {
	const [products, setProducts] = useState(PRODUCTS);
	const value = { products };
	return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
