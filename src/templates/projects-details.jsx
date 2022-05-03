import React from "react";
import PageLayout from "../components/PageLayout";
import * as styles from "../scss/project-details.module.scss";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function ProjectDetails({ data }) {
    const base = data.markdownRemark.frontmatter;
    const { html } = data.markdownRemark;
    const {
        title,
        date,
        author_name,
        author_title,
        meta_title,
        meta_description,
        post_banner_alt,
    } = base;
    const author_image = getImage(
        base.author_img.childImageSharp.gatsbyImageData
    );
    // console.log(author_image);

    const banner_image = getImage(
        base.post_banner.childImageSharp.gatsbyImageData
    );
    return (
        <PageLayout>
            <div className={styles.project_banner_container}>
                <GatsbyImage image={banner_image} alt={post_banner_alt} />
                <h3>{title}</h3>
                <p>{date}</p>
                <div className={styles.article_info_container}>
                    <div className={styles.author_container}>
                        <GatsbyImage
                            image={author_image}
                            alt={`Picture of ${author_name}`}
                        />
                        <div className={styles.author_details}>
                            <h5>{author_name}</h5>
                            <p>{author_title}</p>
                        </div>
                    </div>
                    <div className={styles.share_icons_container}>
                        <p className={styles.fbook_icon}>icon facebook</p>
                        <p className={styles.twitter_icon}>icon twitter</p>
                    </div>
                </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.article_container}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </PageLayout>
    );
}

export const query = graphql`
    query Details($slug: String) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date
                meta_title
                meta_description
                post_banner_alt
                slug
                author_name
                author_title
                author_img {
                    childImageSharp {
                        gatsbyImageData(width: 250, aspectRatio: 1)
                    }
                }
                post_banner {
                    childImageSharp {
                        gatsbyImageData(width: 1400, aspectRatio: 1.5)
                    }
                }
            }
        }
    }
`;
