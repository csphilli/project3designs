import React, { useContext, useEffect } from "react";
import ContentGrid from "../components/ContentGrid";
import * as styles from "../scss/hero.module.scss";
import Seo from "../components/Seo";
import { ProductContext } from "../components/providers/ProductProvider";

function Videos() {
    const { products } = useContext(ProductContext);

    useEffect(() => {
        products && console.log("video", products);
    }, [products]);

    return (
        <main>
            <Seo title="Videos" />
            <section className={styles.heroContainer}>
                <h2>
                    All the videos we've done for your benefit in one place.
                </h2>
                <p>
                    Our core teaching medium is video. It's more personable,
                    easier to convey emotion, and allows for a finer level of
                    detail with respect to instructions.
                </p>
            </section>
            <main>
                <ContentGrid pageId="videos" />
            </main>
        </main>
    );
}

export default Videos;
