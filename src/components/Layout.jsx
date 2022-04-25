import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styling/reset.css";
import "../styling/global.css";

function Layout({ page, children }) {
    return (
        <div className="page-container">
            <Navbar />
            <div className="layout">{children}</div>
            <Footer pageName={page} />
        </div>
    );
}

export default Layout;
