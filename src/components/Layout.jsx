import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Logo from "./Logo";
import "../scss/reset.scss";
import "../scss/global.scss";
import "../scss/typography.scss";
import PageBannerIcon from "./PageBannerIcon";
import { UserContext } from "../lib/UserContext";

// export const GeneralContext = createContext();

function Layout({ pageId, children }) {
    const [showBanner, setShowBanner] = useState(true);
    // const [orderItems, setOrderItems] = useState([]);
    // const [user, setUser] = useState({});

    // const value = useMemo(
    //     () => ({
    //         user,
    //         setUser,
    //     }),
    //     [user, setUser]
    // );
    // const [session, setSession] = useState();
    // const [user, setUser] = useState();

    useEffect(() => {
        pageId === "none" ? setShowBanner(false) : setShowBanner(true);
    }, [pageId]);

    return (
        <div className="logo-container">
            {showBanner && <PageBannerIcon pageId={pageId} />}
            <div className="page-container">
                <UserContext.Provider value="test">
                    <Navbar pageId={pageId} />
                    <div>{children}</div>
                    <Footer />
                </UserContext.Provider>
            </div>
            <Logo />
        </div>
    );
}

export default Layout;
