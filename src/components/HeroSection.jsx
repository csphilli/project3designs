import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "../styling/hero.module.css";

function HeroSection({ pageId }) {
    const query = useStaticQuery(graphql`
        query HeroSectionQuery {
            allMarkdownRemark {
                nodes {
                    frontmatter {
                        id
                        alt
                        banner {
                            childImageSharp {
                                gatsbyImageData(placeholder: BLURRED)
                            }
                        }
                    }
                    html
                }
            }
        }
    `);
    const data = query.allMarkdownRemark.nodes;
    const pageData = data.find((item) => item.frontmatter.id === pageId);
    // const img1 = getImage(pageData.frontmatter.img1);
    // const img2 = getImage(pageData.frontmatter.img2);

    return (
        <section className={styles.heroSection}>
            <div className={styles.heroTextContainer}>
                <div
                    className={styles.heroText}
                    dangerouslySetInnerHTML={{ __html: pageData.html }}
                ></div>
            </div>
            <div className={styles.heroImage}>
                <GatsbyImage
                    className={styles.heroImage}
                    image={getImage(pageData.frontmatter.banner)}
                    alt={pageData.frontmatter.alt}
                />
            </div>
        </section>
    );
}

export default HeroSection;
