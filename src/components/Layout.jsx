import React, { useState, useMemo, useCallback, useEffect } from "react";
import Navbar from "./nav/Navbar";
import Footer from "./Footer";
import "../scss/reset.scss";
import "../scss/global.scss";
import "../scss/typography.scss";
import { CartContext } from "../lib/CartContext";
import { saveToLocal } from "../lib";

const MIN_QTY = 1;

function Layout({ path, children }) {
    const [selection, setSelection] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [showCheckout, setShowCheckout] = useState(null);
    const [cartQty, setCartQty] = useState(null);

    const getCartQty = useCallback(() => {
        const local = JSON.parse(localStorage.getItem("cartItems"));
        if (local) {
            setCartQty(
                local.reduce((total, item) => total + item.value.quantity, 0)
            );
        } else setCartQty(0);
    }, []);

    // const checkShowButton = useCallback(() => {
    //     return selection.quantity > 0;
    // }, [selection]);

    const onAdd = useCallback(
        (e) => {
            e.preventDefault();
            if (selection.quantity + 1 <= selection.maxQty) {
                selection.quantity += 1;
                setInputValue((prev) => prev + 1);
                setCartQty((prev) => prev + 1);
                setShowCheckout(true);
                saveToLocal(selection.product_id, selection);
            }
        },
        [selection]
    );

    const onMinus = useCallback(
        (e) => {
            e.preventDefault();
            if (selection.quantity - 1 >= MIN_QTY) {
                selection.quantity -= 1;
                setInputValue((prev) => prev - 1);
                setCartQty((prev) => prev - 1);
                saveToLocal(selection.product_id, selection);
            }
        },
        [selection]
    );

    // Add a confirm deletion modal
    const onDelete = useCallback(
        (e) => {
            e.preventDefault();
            selection.quantity = 0;
            setInputValue(0);
            saveToLocal(selection.product_id, selection);
            setCartQty((prev) => prev - 1);
            setShowCheckout(false);
        },
        [selection]
    );

    const providerValues = useMemo(
        () => ({
            selection,
            setSelection,
            inputValue,
            setInputValue,
            showCheckout,
            setShowCheckout,
            onAdd,
            onMinus,
            onDelete,
            // checkShowButton,
            cartQty,
            setCartQty,
        }),
        [
            selection,
            setSelection,
            inputValue,
            setInputValue,
            showCheckout,
            setShowCheckout,
            onAdd,
            onMinus,
            onDelete,
            // checkShowButton,
            cartQty,
            setCartQty,
        ]
    );

    useEffect(() => {
        getCartQty();
    }, [getCartQty]);

    return (
        <CartContext.Provider value={providerValues}>
            <div className="logo-container">
                <div className="page-container">
                    <Navbar path={path} />
                    <div>{(path, children)}</div>
                    <Footer />
                </div>
            </div>
        </CartContext.Provider>
    );
}

export default Layout;
