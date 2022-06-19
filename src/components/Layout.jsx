import React, { useState, useEffect, createContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Logo from "./Logo";
import "../scss/reset.scss";
import "../scss/global.scss";
import "../scss/typography.scss";
import PageBannerIcon from "./PageBannerIcon";

export const GeneralContext = createContext();

function Layout({ pageId, children }) {
    const [showBanner, setShowBanner] = useState(true);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        pageId === "none" ? setShowBanner(false) : setShowBanner(true);
    }, [pageId]);

    return (
        <div className="logo-container">
            {showBanner && <PageBannerIcon pageId={pageId} />}
            <div className="page-container">
                <GeneralContext.Provider
                    value={{ order: [orderItems, setOrderItems] }}
                >
                    <Navbar pageId={pageId} />
                    <div>{children}</div>
                </GeneralContext.Provider>
                <Footer />
            </div>
            <Logo />
        </div>
    );
}

export default Layout;
