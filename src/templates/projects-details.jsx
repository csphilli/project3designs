import React, { useState, useEffect } from "react";
import * as styles from "../scss/projectsPages/ContentStyling.module.scss";
import { graphql } from "gatsby";
import { BsCalendarWeek, BsPencilSquare, BsClock } from "react-icons/bs";
import Seo from "../components/Seo";
import { createProdObj, getProduct, readTime } from "../lib";
import LoadingSpinner from "../components/LoadingSpinner";
import PageBanner from "../components/projectPage/PageBanner";
import ProductForm from "../components/productForm/ProductForm";

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
        const res = await getProduct(base.slug);
        res.data.forEach((item) => prodList.push(createProdObj(item)));
        setProducts(prodList);
        setLoading(false);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <Seo title={base.title} />
            <article>
                <PageBanner data={data} bullets={bullets} />
                {loading ? (
                    <LoadingSpinner type="products" />
                ) : (
                    <div className={styles.purchase_container}>
                        <div className={styles.physical_product_container}>
                            <ProductForm products={products} />
                        </div>
                        <div className="styles digital_products_container">
                            I am a plan
                        </div>
                    </div>
                )}

                <div className={styles.article_container}>
                    <div className={styles.article_content}>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                </div>
            </article>
        </div>
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
                slug
                author_name
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
