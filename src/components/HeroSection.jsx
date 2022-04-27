import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as styles from "../styling/hero.module.css";

function HeroSection({ pageId }) {
    const query = useStaticQuery(graphql`
        query MyQuery {
            allMarkdownRemark {
                nodes {
                    frontmatter {
                        title
                        description
                        id
                    }
                    html
                }
            }
        }
    `);
    const data = query.allMarkdownRemark.nodes;
    const pageData = data.find((item) => item.frontmatter.id === pageId);
    return (
        <div
            className={styles.heroText}
            dangerouslySetInnerHTML={{ __html: pageData.html }}
        ></div>
    );
}

export default HeroSection;
