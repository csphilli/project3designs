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

    /*
    These effects have the following order:
    1 - first effect will run but nothing will be done because there aren't yet products due to async function on getting them from the product context
    2 - 2nd effect will run but because of the products gate, nothing will be done. If it did at this stage, and there were actually products saved in local storage, they would be deleted because the first effect is responsible for setting cart items.
    3 - first effect will run again now due to products being in the dependency array. Now that products have come back from the async func in productContext, the functionality inside the first effect will run and as a result, set up the cartItems.
    4 - Now the 2nd useEffect can safely run and it won't delete saved products. If local exists, it will simply create a new expiration date.
    */

    useEffect(() => {
        if (products.length > 0) {
            let qty = 0;

            const local = JSON.parse(localStorage.getItem("cartItems"));

            if (
                local?.items?.length === 0 ||
                Math.floor(Date.now()) > local?.expires
            )
                return;

            local.items.forEach((item) => {
                const exists = products.find(
                    (cItem) => cItem.product_id === item.product_id
                );
                if (exists) {
                    item.sale_limit =
                        exists.sale_limit !== item.sale_limit
                            ? exists.sale_limit
                            : item.sale_limit;
                    item.quantity =
                        item.quantity > item.sale_limit
                            ? item.sale_limit
                            : item.quantity;
                }
                qty += item.quantity;
            });
            local.items.filter((item) => item.quantity > 0);
            setCartItems(local.items);
            setCartQty(qty);
        }
    }, [products]);

    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem(
                "cartItems",
                JSON.stringify({
                    expires: Math.floor(Date.now() + EXPIRES),
                    items: [...cartItems],
                })
            );
        }
    }, [cartItems, products]);

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
