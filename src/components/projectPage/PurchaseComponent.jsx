import React from "react";
import ProductForm from "../productForm/ProductForm";
import * as styles from "../../scss/projectsPages/purchaseComponent.module.scss";

function PurchaseComponent(props) {
    const { p3_id } = props;

    return (
        <div className={styles.component_container}>
            <section className={styles.physical_product_container}>
                <h2>Available for Purchase</h2>
                <ProductForm p3_id={p3_id} />
            </section>
            <aside className={styles.product_info}>
                <h2>Product Details</h2>
                <p>
                    Some projects we make can be obtained exclusively through
                    our site either in the form of the physical product itself,
                    or by making it yourself via a digital plan.
                </p>
                <p>
                    Check out the <span>Digital Plan</span> sample to see what
                    they're all about.
                </p>
                <p>
                    The product menu includes the sizes of the products and/or{" "}
                    <em>"digital plan"</em> if there's a digital plan available
                </p>
                <p>
                    A product's size is the largest rectangular shape that can
                    fit around the product
                </p>
            </aside>
        </div>
    );
}

export default PurchaseComponent;
