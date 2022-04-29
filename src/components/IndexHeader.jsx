import React from "react";
import { Helmet } from "react-helmet";

function IndexHeader({ pageData }) {
    return (
        <Helmet>
            <title>{pageData.frontmatter.meta_title}</title>
            <meta
                name="description"
                content={pageData.frontmatter.meta_description}
            ></meta>
        </Helmet>
    );
}

export default IndexHeader;
