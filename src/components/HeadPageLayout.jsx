import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Logo from "./Logo";
import IndexHeader from "./IndexHeader";
import { graphql, useStaticQuery } from "gatsby";
import "../scss/reset.scss";
import "../scss/global.scss";
import "../scss/typography.scss";
import HeroSection from "./HeroSection";
import PageBannerIcon from "./PageBannerIcon";

function HeadPageLayout({ pageId, children }) {
    const query = useStaticQuery(graphql`
        query LayoutQuery {
            allMarkdownRemark {
                nodes {
                    frontmatter {
                        page_id
                        meta_title
                        meta_description
                        hero_h2
                        hero_p
                    }
                    html
                }
            }
        }
    `);
    const pageData = query.allMarkdownRemark.nodes.find(
        (item) => item.frontmatter.page_id === pageId
    );
    if (!pageData) {
        console.error("Error, cannot find page id in layout component");
    }
    console.log(pageData);

    return (
        <div className="logo-container">
            <IndexHeader pageData={pageData} />
            <PageBannerIcon pageId={pageData.frontmatter.page_id} />
            <div className="page-container">
                <Navbar pageId={pageData.frontmatter.page_id} />
                {/* <HeroSection pageData={pageData} /> */}
                <div>{children}</div>
                <Footer />
            </div>
            <Logo />
        </div>
    );
}

export default HeadPageLayout;
