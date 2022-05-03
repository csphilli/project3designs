import React from "react";
import IndexHeader from "./IndexHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Logo from "./Logo";

function PageLayout({ children }) {
    return (
        <article>
            <div>{children}</div>
            {/* <IndexHeader pageData={pageData} />
            <div className="page-container">
                <Navbar pageId={pageData.frontmatter.page_id} />
                <div>{children}</div>
                <Footer />
            </div>
            <Logo pageId={pageData.frontmatter.page_id} /> */}
        </article>
    );
}

export default PageLayout;
