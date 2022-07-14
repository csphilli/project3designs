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
            <div className="outer_page_container">
                <Navbar path={path} />
                <div className="page_container">
                    <div>{(path, children)}</div>
                    <Footer />
                </div>
            </div>
        </ProjectContext.Provider>
    );
}

export default Layout;
