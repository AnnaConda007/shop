import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find((cartItem) => {
		return cartItem.id === productToAdd.id; // есть ли совпад id
	});
	if (existingCartItem) {
		// если есть совпадение
		return cartItems.map((cartItem) => {
			// то просто увеличиваем колличство товаров этой категории
			return cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem;
		}); // и прекращаем выполнять функцию
	}
	return [...cartItems, { ...productToAdd, quantity: 1 }]; // если existingCartItem нет , то просто добавляем товар
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
	const [cartCount, setCartCount] = useState(0);
	const addItemToCart = (productAdd) => {
		setCartItem(addCartItem(cartItems, productAdd));
	};
	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => {
			return total + cartItem.quantity; //total устанавливается в ноль, cartItem это каждый элемент корзины со свойством quantity. и на каждой итерации к total сумируется cartItem
		}, 0);
		setCartCount(newCartCount);
	}, [cartItems]);

	const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/*
есть компонент Shop, где отрисовывается массив товаров. 
каждый элемент массива передается в карточку товара, а уже на кнопке в карточке вызывается функция addItemToCart куда передаётся конкретный товар, который компонент получает от shop 
*/
