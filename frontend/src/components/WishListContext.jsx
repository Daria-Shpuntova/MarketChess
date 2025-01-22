import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToWishlist = (item) => {
        setWishlistItems((prev) => [...prev, item]);
    };

    // Другие функции для работы с избранным

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
