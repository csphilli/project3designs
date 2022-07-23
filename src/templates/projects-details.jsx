import React from "react";
import { BsCalendarWeek, BsPencilSquare, BsClock } from "react-icons/bs";
import { graphql } from "gatsby";
import { readTime } from "../lib";
import PageBanner from "../components/projectPage/PageBanner";
import Seo from "../components/Seo";
import PurchaseComponent from "../components/projectPage/PurchaseComponent";
import * as styles from "../scss/templateStyling/projectsDetails.module.scss";
import Carousel from "../components/Carousel";
import { useProductContext } from "../components/providers/ProductProvider";

export default function ProjectDetails({ data }) {
    const { products } = useProductContext();
    const base = data.markdownRemark.frontmatter;
    const { html } = data.markdownRemark;
    const bullets = [
        {
            text: base.date,
            icon: <BsCalendarWeek />,
        },
        {
            text: base.author_name,
            icon: <BsPencilSquare />,
        },
        {
            text: readTime(data.markdownRemark.html),
            icon: <BsClock />,
        },
    ];

    return (
        <section className={styles.section_container}>
            <Seo title={base.title} description={base.description} />
            <section className={styles.purchase_container}>
                <div className={styles.banner_container}>
                    <PageBanner data={data} bullets={bullets} />
                </div>
                <PurchaseComponent
                    products={products?.filter(
                        (item) => item.p3_id === base.p3_id
                    )}
                />
            </section>
            <div className={styles.image_carousel}>
                <Carousel images={data.allFile.nodes} />
            </div>
            <article className={styles.article_container}>
                <div className={styles.article_content}>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </article>
        </section>
    );
}

export const query = graphql`
    query ProjectDetails($slug: String, $dir: String) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                description
                date(formatString: "MMMM DD, YYYY")
                p3_id
                slug
                author_name
                page_root
                post_banner {
                    childImageSharp {
                        gatsbyImageData(
                            width: 1400
                            aspectRatio: 1.6
                            height: 300
                        )
                    }
                }
                post_thumb {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
        allFile(filter: { relativeDirectory: { eq: $dir } }) {
            nodes {
                childImageSharp {
                    gatsbyImageData
                }
            }
        }
    }
`;
