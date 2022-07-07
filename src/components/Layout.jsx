import React, { useState, useMemo, useCallback, useEffect } from "react";
import Navbar from "./nav/Navbar";
import Footer from "./Footer";
import "../scss/reset.scss";
import "../scss/global.scss";
import "../scss/typography.scss";
import { ProjectContext } from "../lib/ProjectContext";

function Layout({ path, children }) {
    const [selection, setSelection] = useState(null);
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

    const providerValues = useMemo(
        () => ({
            selection,
            setSelection,
            showCheckout,
            setShowCheckout,
            cartQty,
            setCartQty,
        }),
        [
            selection,
            setSelection,
            showCheckout,
            setShowCheckout,
            cartQty,
            setCartQty,
        ]
    );

    useEffect(() => {
        getCartQty();
    }, [getCartQty]);

    return (
        <ProjectContext.Provider value={providerValues}>
            <div className="logo-container">
                <div className="page-container">
                    <Navbar path={path} />
                    <div>{(path, children)}</div>
                    <Footer />
                </div>
            </div>
        </ProjectContext.Provider>
    );
}

export default Layout;
