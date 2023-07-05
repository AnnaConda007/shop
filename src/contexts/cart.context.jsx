import { createContext, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find((cartItem) => {
		return cartItem.id === productToAdd.id; // есть ли совпад id
	});
	if (existingCartItem) { // если есть совпадение
		return cartItems.map((cartItem) => {// то просто увеличиваем колличство товаров этой категории
			return cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem;
		});// и прекращаем выполнять функцию
	} 
	return [...cartItems, { ...productToAdd, quantity: 1 }];// если existingCartItem нет , то просто добавляем товар 
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItem: [],  
	setCartItem: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const [cartItems, setCartItem] = useState([]);
	const addItemToCart  = (productAdd) => {
	setCartItem(addCartItem(cartItems, productAdd));
	};
	const value = { isCartOpen, setIsCartOpen, addItemToCart , cartItems };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
