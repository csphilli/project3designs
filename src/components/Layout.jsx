import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Logo from "./Logo";
import "../scss/reset.scss";
import "../scss/global.scss";
import "../scss/typography.scss";
import PageBannerIcon from "./PageBannerIcon";

function Layout({ pageId, children }) {
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        pageId === "none" ? setShowBanner(false) : setShowBanner(true);
    }, [pageId]);

    return (
        <div className="logo-container">
            {showBanner && <PageBannerIcon pageId={pageId} />}
            <div className="page-container">
                <Navbar pageId={pageId} />
                <div>{children}</div>
                <Footer />
            </div>
            <Logo />
        </div>
    );
}

export default Layout;
