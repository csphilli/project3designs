import React from "react";
import * as styles from "../scss/video-details.module.scss";
import { graphql } from "gatsby";
import { BsCalendarWeek, BsPencilSquare, BsClock } from "react-icons/bs";
import Video from "../components/Video";

function readTime(text) {
    const time = Math.ceil((text.split(" ").length + 1) / 130);
    if (time <= 1) return `${time} minute`;
    return `${time} minutes`;
}

export default function ProjectDetails({ data }) {
    const base = data.markdownRemark.frontmatter;
    const time = readTime(data.markdownRemark.html);
    const { html } = data.markdownRemark;
    return (
        <article>
            <div className={styles.heading_container}>
                <div className={styles.title_banner_container}>
                    <h2 className={styles.title}>{base.title}</h2>
                    <Video
                        videoID={base.videoID}
                        videoTitle={base.videoTitle}
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
                </div>
            </div>

            <div className={styles.article_container}>
                <div className={styles.article_content}>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </div>
        </article>
    );
}

export const query = graphql`
    query VideoDetails($slug: String) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                description
                page_root
                slug
                date(formatString: "MMMM DD, YYYY")
                author_name
                post_thumb {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                videoID
                videoTitle
            }
        }
    }
`;
