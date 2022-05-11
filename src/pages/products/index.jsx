import React from "react";
import HeadPageLayout from "../../components/HeadPageLayout";
import ProductGrid from "../../components/ProductGrid";

function Products() {
    return (
        <div>
            <HeadPageLayout pageId="products">
                <main>
                    <ProductGrid />
                </main>
            </HeadPageLayout>
        </div>
    );
}

export default Products;
