import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import * as styles from "../scss/content.module.scss";
import Card from "./Card";

function ContentGrid({ pageId }) {
    const query = useStaticQuery(graphql`
        query MyQuery {
            allMarkdownRemark(
                sort: { fields: frontmatter___date, order: DESC }
            ) {
                nodes {
                    frontmatter {
                        title_snippet
                        post_thumb {
                            childImageSharp {
                                gatsbyImageData(aspectRatio: 1.6, width: 600)
                            }
                        }
                        slug
                        site_category
                        date
                    }
                    id
                }
            }
        }
    `);
    const content = query.allMarkdownRemark.nodes.filter(
        (item) => item.frontmatter.site_category === pageId
    );
    return (
        <section className={styles.contentContainer}>
            {content.map((item) => (
                <Link to={`/${pageId}/${item.frontmatter.slug}`} key={item.id}>
                    <Card props={item.frontmatter} />
                </Link>
            ))}
        </section>
    );
}

export default ContentGrid;
