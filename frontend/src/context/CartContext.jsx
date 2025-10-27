import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ rent: [], buy: [] });

    const addToCart = (book, type) => {
        setCart((prevCart) => {
            if (type === 'rent') {
                return { ...prevCart, rent: [...prevCart.rent, book] };
            } else if (type === 'buy') {
                return { ...prevCart, buy: [...prevCart.buy, book] };
            }
            return prevCart;
        });
        console.log('Current Cart:', { ...cart, [type]: [...cart[type], book] }); // Debugging line
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
