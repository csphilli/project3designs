import React from "react";
import Layout from "./src/components/Layout";

export function wrapPageElement({ element, props }) {
    // console.log(Object.keys(props));
    return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
    return <>{element}</>;
}
