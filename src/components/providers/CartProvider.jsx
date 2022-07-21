import React, {
    createContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
} from "react";

// Expiration date of localStorage cart: 1 week in milliseconds. If a user alters the cart within the expiration window, it resets.
const EXPIRES = 7 * 24 * 60 * 60 * 1000;

export const CartContext = createContext(null);
export const CartProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartQty, setCartQty] = useState(null);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("cartItems"));
        if (local && Math.floor(Date.now()) < local.expires) {
            setCartItems(local.items);
            setCartQty(
                local.items.reduce((acc, index) => acc + index.quantity, 0)
            );
        } else {
            localStorage.removeItem("cartItems");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "cartItems",
            JSON.stringify({
                expires: Math.floor(Date.now() + EXPIRES),
                items: [...cartItems],
            })
        );
    }, [cartItems]);

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
