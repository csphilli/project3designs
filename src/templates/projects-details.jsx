import React, { useState, useEffect } from "react";
import { BsCalendarWeek, BsPencilSquare, BsClock } from "react-icons/bs";
import { graphql } from "gatsby";
import { createProdObj, getProduct, readTime } from "../lib";
import LoadingSpinner from "../components/LoadingSpinner";
import PageBanner from "../components/projectPage/PageBanner";
import Seo from "../components/Seo";
import PurchaseComponent from "../components/projectPage/PurchaseComponent";
import * as styles from "../scss/templateStyling/projectsDetails.module.scss";
import { refreshQtyFromLocal } from "../lib";
import Carousel from "../components/Carousel";

export default function ProjectDetails({ data }) {
    const base = data.markdownRemark.frontmatter;

    const { html } = data.markdownRemark;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const getProducts = async () => {
        let prodList = [];
        const res = await getProduct(base.p3_id);
        res.data.forEach((item) => prodList.push(createProdObj(item)));
        refreshQtyFromLocal(prodList);
        setProducts(prodList);
        setLoading(false);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <section className={styles.section_container}>
            <Seo title={base.title} description={base.description} />
            <section className={styles.purchase_container}>
                <PageBanner data={data} bullets={bullets} />
                {loading ? (
                    <div className={styles.spinner_container}>
                        <LoadingSpinner type="products" />
                    </div>
                ) : (
                    <PurchaseComponent products={products} />
                )}
            </section>
            <div className={styles.image_carousel}>
                <Carousel slug={base.slug} />
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
    query ProjectDetails($slug: String) {
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
    }
`;
