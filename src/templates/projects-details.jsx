import React, { useState, useEffect } from "react";
import * as styles from "../scss/project-details.module.scss";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import QtyButton from "../components/inputs/QtyButton";
import {
    BsCalendarWeek,
    BsPencilSquare,
    BsClock,
    BsHammer,
} from "react-icons/bs";
import Seo from "../components/Seo";
import { createProdObj, getProduct, getTooltipText } from "../lib";
import LoadingSpinner from "../components/LoadingSpinner";

function readTime(text) {
    const time = Math.ceil((text.split(" ").length + 1) / 130);
    if (time <= 1) return `${time} minute`;
    return `${time} minutes`;
}

const getMax = (inv, max_qty, qty) => {
    const max = inv < max_qty ? inv : max_qty;
    return max - qty;
};

export default function ProjectDetails({ data }) {
    const base = data.markdownRemark.frontmatter;
    const [selection, setSelection] = useState("");
    const [products, setProducts] = useState([]);
    const [maxQty, setMaxQty] = useState();
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        const res = await getProduct(base.slug);
        res.data.forEach((item) => createProdObj(item));
        setProducts(res.data);
        setSelection(res.data[0]);
    };

    useEffect(() => {
        getProducts();
        setLoading(false);
    }, []);

    const updateQty = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        selection.quantity = form.get("quantity");
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        const item = products.find(
            (item) => item.product_id === e.target.value
        );
        console.log(item);

        // setMaxQty();
    };

    const time = readTime(data.markdownRemark.html);
    const { html } = data.markdownRemark;
    const banner_image = getImage(
        base.post_banner.childImageSharp.gatsbyImageData
    );
    return (
        <div>
            <Seo title={base.title} />
            <article>
                <div className={styles.heading_container}>
                    <div className={styles.title_banner_container}>
                        <GatsbyImage
                            className={styles.banner_image}
                            image={banner_image}
                            alt="image illustrating banner"
                        />
                    </div>
                    <div className={styles.publishing_container}>
                        <div className={styles.date_container}>
                            <BsCalendarWeek className={styles.icon} />
                            <p>{base.date}</p>
                        </div>
                        <div className={styles.author_container}>
                            <BsPencilSquare className={styles.icon} />
                            <p className={styles.author_name}>
                                {base.author_name}
                            </p>
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
                    <h2 className={styles.title}>{base.title}</h2>
                </div>
                <div className={styles.purchase_container}>
                    <div className={styles.physical_product_container}>
                        <form
                            className={styles.modal_form}
                            onSubmit={updateQty}
                        >
                            <label htmlFor="size">Size:</label>
                            <select
                                className={styles.selector_menu}
                                name="product_id"
                                // defaultValue={selection.size}
                                onChange={handleChange}
                            >
                                {products.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.product_id}
                                    >
                                        {item.size}
                                    </option>
                                ))}
                            </select>
                            <label
                                className={styles.quantity_title}
                                htmlFor="quantity"
                            >
                                Available: {maxQty}
                            </label>

                            <div>
                                {/* <QtyButton max={maxQty} /> */}
                                <button
                                    className={styles.submit_button}
                                    type="submit"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

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
