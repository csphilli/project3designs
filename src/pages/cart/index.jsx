import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";

function Cart() {
    return (
        <div>
            <Layout pageId="cart">
                <Seo title="Cart" />I am the shopping cart page
            </Layout>
        </div>
    );
}

export default Cart;
