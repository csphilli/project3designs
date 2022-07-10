import React, { useState, useMemo, useEffect } from "react";
import Navbar from "./nav/Navbar";
import Footer from "./Footer";
import "../scss/reset.scss";
import "../scss/global.scss";
import "../scss/typography.scss";
import { ProjectContext } from "../lib/ProjectContext";
import { getCartQty } from "../lib";

function Layout({ path, children }) {
    const [cartQty, setCartQty] = useState(null);
    useEffect(() => {
        setCartQty(getCartQty());
    }, []);

    const providerValues = useMemo(
        () => ({
            cartQty,
            setCartQty,
        }),
        [cartQty, setCartQty]
    );

    useEffect(() => {
        getCartQty();
    }, []);

    return (
        <ProjectContext.Provider value={providerValues}>
            <div className="page-container">
                <Navbar path={path} />
                <div>{(path, children)}</div>
                <Footer />
            </div>
        </ProjectContext.Provider>
    );
}

export default Layout;
