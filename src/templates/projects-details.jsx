import React from "react";
import PageLayout from "../components/PageLayout";
import * as styles from "../scss/project-details.module.scss";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import IndexHeader from "../components/IndexHeader";
import Logo from "../components/Logo";
import {
    BsCalendarWeek,
    BsPencilSquare,
    BsClock,
    BsHammer,
} from "react-icons/bs";

function readTime(text) {
    const time = Math.ceil((text.split(" ").length + 1) / 130);
    if (time <= 1) return `${time} minute`;
    return `${time} minutes`;
}

export default function ProjectDetails({ data }) {
    const base = data.markdownRemark.frontmatter;
    const time = readTime(data.markdownRemark.html);
    const { html } = data.markdownRemark;
    // const author_image = getImage(
    //     base.author_img.childImageSharp.gatsbyImageData
    // );
    const banner_image = getImage(
        base.post_banner.childImageSharp.gatsbyImageData
    );
    return (
        <PageLayout pageData={base}>
            {/* <IndexHeader pageData={pageData} /> */}
            <div className={styles.heading_container}>
                <div className={styles.title_banner_container}>
                    <h2 className={styles.title}>{base.title}</h2>
                    <GatsbyImage
                        className={styles.banner_image}
                        image={banner_image}
                        alt={base.post_banner_alt}
                    />
                </div>
                <div className={styles.publishing_container}>
                    <div className={styles.date_container}>
                        <BsCalendarWeek className={styles.icon} />
                        <p>{base.date}</p>
                    </div>
                    <div className={styles.author_container}>
                        <BsPencilSquare className={styles.icon} />
                        <p className={styles.author_name}>{base.author_name}</p>
                    </div>

                    <div className={styles.read_time_container}>
                        <BsClock className={styles.icon} />
                        <p>{time}</p>
                    </div>
                    <div className={styles.build_time_container}>
                        <BsHammer className={styles.icon} />
                        <p>{base.build_time}</p>
                    </div>
                </div>
            </div>

            <div className={styles.article_container}>
                <div className={styles.article_content}>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </div>
            <Logo pageId={base.page_root} />
        </PageLayout>
    );
}

export const query = graphql`
    query Details($slug: String) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                meta_title
                meta_description
                post_banner_alt
                slug
                author_name
                author_title
                page_root
                build_time
                author_img {
                    childImageSharp {
                        gatsbyImageData(width: 75, aspectRatio: 1)
                    }
                }
                post_banner {
                    childImageSharp {
                        gatsbyImageData(
                            width: 1400
                            aspectRatio: 1.6
                            height: 300
                        )
                    }
                }
            }
        }
    }
`;
