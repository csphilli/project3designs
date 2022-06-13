import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Used for non-header pages
function PageLayout({ children, pageData }) {
    return (
        <article>
            <div className="logo-container">
                <div className="page-container">
                    <Navbar pageId="none" />
                    <div>{children}</div>
                    <Footer />
                </div>
            </div>
        </article>
    );
}

export default PageLayout;
