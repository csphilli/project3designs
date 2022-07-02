import React, { useState, useMemo } from "react";
import Navbar from "./nav/Navbar";
import Footer from "./Footer";
import "../scss/reset.scss";
import "../scss/global.scss";
import "../scss/typography.scss";
// import PageBannerIcon from "./PageBannerIcon";
import { UserContext } from "../lib/UserContext";

// export const GeneralContext = createContext();

// function Layout({ pageId, children }) {
function Layout({ path, children }) {
    // const [showBanner, setShowBanner] = useState(true);
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

    return (
        <UserContext.Provider value="test">
            <div className="logo-container">
                {/* {showBanner && <PageBannerIcon path={path} />} */}
                <div className="page-container">
                    <Navbar path={path} />
                    <div>{children}</div>
                    <Footer />
                </div>
            </div>
        </UserContext.Provider>
    );
}

export default Layout;
