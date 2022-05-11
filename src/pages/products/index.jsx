import React from "react";
import HeadPageLayout from "../../components/HeadPageLayout";
import ProductsList from "../../components/ProductsList";
import Cart from "../../components/Cart";
import * as styles from "../../scss/products.module.scss";

function Products() {
    return (
        <div>
            <HeadPageLayout pageId="products">
                <div className={styles.container_grid}>
                    <aside className={styles.cart}>
                        <Cart />
                    </aside>
                    <main className={styles.products}>
                        <ProductsList />
                    </main>
                </div>
            </HeadPageLayout>
        </div>
    );
}

export default Products;
