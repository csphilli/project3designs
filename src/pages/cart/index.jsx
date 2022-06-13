import React from "react";
import HeadPageLayout from "../../components/HeadPageLayout";
import Seo from "../../components/Seo";

function Cart() {
    return (
        <div>
            <HeadPageLayout pageId="cart">
                <Seo title="Cart" />I am the shopping cart page
            </HeadPageLayout>
        </div>
    );
}

export default Cart;
