import React, {
    createContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
} from "react";

export const CartContext = createContext(null);
export const CartProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartQty, setCartQty] = useState(null);

    // use effect to populate cart with localstorage

    const onAdd = useCallback(
        (product) => {
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
        },
        [cartItems]
    );

    const onMinus = useCallback(
        (product) => {
            const exists = cartItems?.find(
                (item) => item.product_id === product.product_id
            );
            if (exists && exists.quantity - 1 === 0) {
                setCartItems(
                    cartItems.filter(
                        (item) => item.product_id !== exists.product_id
                    )
                );
            } else if (exists) {
                setCartItems(
                    cartItems.map((item) =>
                        item.product_id === exists.product_id
                            ? { ...exists, quantity: exists.quantity - 1 }
                            : item
                    )
                );
            }
            setCartQty((prevState) => prevState - 1);
        },
        [cartItems]
    );

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
