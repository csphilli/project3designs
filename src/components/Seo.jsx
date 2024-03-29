import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import { PropTypes } from "prop-types";

function Seo({ description, lang, meta, image: metaImage, title, pathname }) {
    const { site } = useStaticQuery(graphql`
        query SiteQuery {
            site {
                siteMetadata {
                    author
                    description
                    keywords
                    siteUrl
                    title
                }
            }
        }
    `);

    const metaDescription = description || site.siteMetadata.description;
    const image =
        metaImage && metaImage.src
            ? `${site.siteMetadata.siteUrl}${metaImage.src}`
            : null;

    // console.log(image);

    const canonical = pathname
        ? `${site.siteMetadata.siteUrl}${pathname}`
        : null;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            link={
                canonical
                    ? [
                          {
                              rel: "canonical",
                              href: canonical,
                          },
                      ]
                    : []
            }
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    name: "keywords",
                    content: site.siteMetadata.keywords.join(","),
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ]
                .concat(
                    metaImage
                        ? [
                              {
                                  property: "og:image",
                                  content: image,
                              },
                              {
                                  property: "og:image:width",
                                  content: metaImage.width,
                              },
                              {
                                  property: "og:image:height",
                                  content: metaImage.height,
                              },
                              {
                                  name: "twitter:card",
                                  content: "summary_large_image",
                              },
                          ]
                        : [
                              {
                                  name: "twitter:card",
                                  content: "summary",
                              },
                          ]
                )
                .concat(meta)}
        >
            {title === "Login" ? (
                <script
                    src="https://www.google.com/recaptcha/api.js"
                    async
                    defer
                ></script>
            ) : null}
        </Helmet>
    );
}

Seo.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
};

Seo.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }),
    pathname: PropTypes.string,
};

export default Seo;
