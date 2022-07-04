import React from "react";
import ProductForm from "../productForm/ProductForm";
import * as styles from "../../scss/projectsPages/purchaseComponent.module.scss";

function PurchaseComponent(props) {
    const { products } = props;
    return (
        <div className={styles.component_container}>
            <div className={styles.physical_product_container}>
                <h2>Physical Product</h2>
                <ProductForm products={products} />
            </div>
            <div className={styles.digital_products_container}>
                <h2>Digital Plans</h2>

                <p>I am a plan</p>
            </div>
        </div>
    );
}

export default PurchaseComponent;
