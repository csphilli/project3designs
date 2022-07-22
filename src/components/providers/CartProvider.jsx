import React, {
    createContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
    useContext,
} from "react";
import { useProductContext } from "./ProductProvider";

// Expiration date of localStorage cart: 1 week in milliseconds. If a user alters the cart within the expiration window, it resets.
const EXPIRES = 7 * 24 * 60 * 60 * 1000;

const CartContext = createContext([]);

const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCartContext was used outside of its Provider");
    }
    return context;
};

const CartProvider = (props) => {
    const { products } = useProductContext();
    const [cartItems, setCartItems] = useState([]);
    const [cartQty, setCartQty] = useState(0);

    useEffect(() => {
        console.log(products);
    }, [products]);

    // useEffect(() => {
    // if (products) {
    //     const local = JSON.parse(localStorage.getItem("cartItems"));
    //     if (local?.list?.length > 0) {
    //         console.log("local exists");
    //     }
    // }
    // const updateFromLocal = () => {
    // const local = JSON.parse(localStorage.getItem("cartItems"));
    // if (local?.items.length > 0 && Math.floor(Date.now()) > local.expires) {
    //     console.log("local length > 0 && expired");
    //     localStorage.removeItem("cartItems");
    //     return;
    // }
    // if (local?.items.length > 0 && products?.length === 0) {
    //     console.log("local length > 0 but no product data");
    //     setCartItems(local.items);
    //     setCartQty(
    //         local.items.reduce((acc, index) => acc + index.quantity, 0)
    //     );
    //     return;
    // }
    // if (local?.items.length > 0 && products?.length > 0) {
    //     let qty = 0;
    //     local.items.forEach((item) => {
    //         const exists = products.find(
    //             (p) => p.product_id === item.product_id
    //         );
    //         if (exists) {
    //             item.sale_limit = exists.sale_limit;
    //             item.quantity =
    //                 item.quantity > item.sale_limit
    //                     ? item.sale_limit
    //                     : item.quantity;
    //             qty += item.quantity;
    //         }
    //     });
    //     setCartItems(local.items);
    //     setCartQty(qty);
    // }
    // };
    // }, [products]);

    useEffect(() => {
        console.log("cart", cartItems);

        if (cartItems?.length > 0) {
            localStorage.setItem(
                "cartItems",
                JSON.stringify({
                    expires: Math.floor(Date.now() + EXPIRES),
                    items: [...cartItems],
                })
            );
        }
    }, [cartItems]);

    const onAdd = useCallback(
        (product) => {
            const exists = cartItems?.find(
                (item) => item.product_id === product.product_id
            );
            if (exists) {
                setCartItems(
                    cartItems?.map((item) =>
                        item.product_id === exists.product_id
                            ? { ...exists, quantity: exists.quantity + 1 }
                            : item
                    )
                );
            } else setCartItems([...cartItems, { ...product, quantity: 1 }]);
            setCartQty((prevState) => prevState + 1);
            cartItems && console.log("cartItems", cartItems);
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
                    cartItems?.filter(
                        (item) => item.product_id !== exists.product_id
                    )
                );
            } else if (exists) {
                setCartItems(
                    cartItems?.map((item) =>
                        item.product_id === exists.product_id
                            ? { ...exists, quantity: exists.quantity - 1 }
                            : item
                    )
                );
            }
            setCartQty((prevState) => prevState - 1);
            cartItems && console.log("cartItems", cartItems);
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

export { useCartContext, CartProvider };

/*
nst CartContext = createContext([]);

const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCartContext was used outside of its Provider");
    }
    return context;
};

const CartProvider = (props) => {
*/
