import React, { createContext, useEffect, useState, useMemo } from "react";

export const CartContext = createContext(null);
export const CartProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartQty, setCartQty] = useState(null);

    const onAdd = (product) => {
        const exists = cartItems?.find(
            (item) => item.product_id === product.product_id
        );
        if (exists) {
            setCartItems(
                cartItems.map((item) =>
                    item.product_id === exists.product_id
                        ? { ...exists, quantity: exists.quantity + 1 }
                        : item
                )
            );
        } else setCartItems([...cartItems, { ...product, quantity: 1 }]);
        setCartQty((prevState) => prevState + 1);
    };

    const onMinus = (product) => {
        const exists = cartItems?.find(
            (item) => item.product_id === product.product_id
        );
        if (exists && exists.quantity - 1 === 0) {
            console.log("exists and will delete");

            setCartItems(
                cartItems.filter(
                    (item) => item.product_id !== exists.product_id
                )
            );
        } else if (exists) {
            console.log("exists but reducing qty");

            setCartItems(
                cartItems.map((item) =>
                    item.product_id === exists.product_id
                        ? { ...exists, quantity: exists.quantity - 1 }
                        : item
                )
            );
        }
        setCartQty((prevState) => prevState - 1);
    };

    const cartProviderValues = useMemo(
        () => ({
            cartItems,
            cartQty,
            onAdd,
            onMinus,
        }),
        [cartItems, cartQty, onAdd, onMinus]
    );

    return (
        <CartContext.Provider value={cartProviderValues}>
            {props.children}
        </CartContext.Provider>
    );
};
