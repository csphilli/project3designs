import React, { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { graphql, useStaticQuery, Link } from "gatsby";
import * as hero from "../../scss/hero.module.scss";
import * as styles from "../../scss/gallery.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { GalleryInfo } from "./gallery";

function Gallery() {
    const [data, setData] = useState([]);
    const [imageData, setImageData] = useState([]);
    const query = useStaticQuery(graphql`
        query MyGalleryQuery {
            allFile(filter: { sourceInstanceName: { eq: "gallery" } }) {
                nodes {
                    name
                    childImageSharp {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
            }
        }
    `);

    useEffect(() => {
        setData(query.allFile.nodes);
        setImageData(GalleryInfo.sort((a, b) => a.created - b.created));
    }, []);

    return (
        <main>
            <Seo
                title="Gallery"
                description="Carefully curated images of our projects"
            />
            <section className={hero.heroContainer}>
                <h2>Welcome to the Gallery!</h2>
                <p>
                    Here you'll find images of our most prized creations. They
                    all link back to the actual project page if you're
                    interested in learning more.
                </p>
            </section>
            <section className={styles.gallery_grid_container}>
                {imageData.map((obj, index) => {
                    const image = getImage(
                        data.find((item) => item.name === obj.name)
                    );
                    return (
                        <Link
                            className={styles.gallery_image_link}
                            aria-label={`${obj.ariaLabel}`}
                            key={index}
                            to={obj.slug}
                        >
                            <GatsbyImage
                                image={image}
                                className={styles.gallery_image}
                                alt={`${obj.alt}`}
                            />
                        </Link>
                    );
                })}
            </section>
        </main>
    );
}

export default Gallery;
