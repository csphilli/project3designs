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
                        title
                        post_thumb {
                            childImageSharp {
                                gatsbyImageData(aspectRatio: 1.5, width: 500)
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
    console.log(content);
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
