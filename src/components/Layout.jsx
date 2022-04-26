import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Logo from "./Logo";
import IndexHeader from "./IndexHeader";
import "../styling/reset.css";
import "../styling/global.css";

function Layout({ page, children }) {
    return (
        <div className="logo-container">
            <div className="page-container">
                <IndexHeader pageId={page} />
                <Navbar />
                <div className="layout">{children}</div>
                <Footer />
            </div>
            <Logo pageId={page} />
        </div>
    );
}

export default Layout;
