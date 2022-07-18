import React, { useState, useMemo, useEffect } from "react";
import Navbar from "./nav/Navbar";
import Footer from "./Footer";
import "../scss/reset.scss";
import "../scss/global.scss";
import "../scss/typography.scss";
import { ProductProvider } from "./providers/ProductProvider";
import { CartProvider } from "./providers/CartProvider";

function Layout({ path, children }) {
    return (
        <ProductProvider>
            <CartProvider>
                <div className="outer_page_container">
                    <Navbar path={path} />
                    <div className="page_container">
                        <div>{(path, children)}</div>
                        <Footer />
                    </div>
                </div>
            </CartProvider>
        </ProductProvider>
    );
}

export default Layout;
