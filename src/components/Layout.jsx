import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="layout">{children}</div>
            <footer>
                <p>filler paragraph for now but use proper footer later</p>
            </footer>
        </div>
    );
}

export default Layout;
