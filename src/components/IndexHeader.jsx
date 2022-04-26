import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

function IndexHeader({ pageId }) {
    const query = useStaticQuery(graphql`
        query indexHeaderQuery {
            site {
                siteMetadata {
                    pages {
                        description
                        title
                        id
                    }
                }
            }
        }
    `);
    const pagesArr = query.site.siteMetadata.pages;
    const page = pagesArr.find((item) => item.id === pageId);

    return (
        <Helmet>
            <title>{page.title}</title>
            <meta name="description" content={page.description}></meta>
        </Helmet>
    );
}

export default IndexHeader;
