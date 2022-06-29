import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { UserContext } from "../../lib/UserContext";

function Cart() {
    // const msg = useContext(UserContext);
    return (
        <div>
            <Layout pageId="cart">
                <Seo title="Cart" />I am the shopping cart page
                {/* {msg && msg} */}
            </Layout>
        </div>
    );
}

export default Cart;
