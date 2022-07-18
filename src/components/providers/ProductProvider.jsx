import React, { createContext, useState, useEffect, useMemo } from "react";
import { createProdObj, getProducts } from "../../lib";

export const ProductContext = createContext(null);
export const ProductProvider = (props) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const data = await getProducts();
        const prods = data.data.map((item) => createProdObj(item));
        setProducts(prods);
    };

    // const updateQuantity = (p3_id, prod_id, qty) => {
    //     const exists = products.find((item) => item.p3_id === p3_id);
    //     if (exists) {
    //         const prod = exists.find((item) => item.product_id === prod_id);
    //         if (prod) {
    //             prod;
    //         }
    //     }
    // };

    useEffect(() => {
        console.log("product provider ran");

        fetchProducts();
    }, []);

    const productProviderValues = useMemo(
        () => ({
            products,
        }),
        [products]
    );

    return (
        <ProductContext.Provider value={productProviderValues}>
            {props.children}
        </ProductContext.Provider>
    );
};

/*
import React, { useState, createContext, useEffect } from 'react';
import API from "../../API"
export const HeaderContext = createContext();
export const HeaderProvider = (props) => {

    const [headerData, setHeaderData] = useState([]);

    const getHeader = async () => {
        const header = await API.fetchHeader();
        setHeaderData(header);
    };

    useEffect(() => {
        getHeader();
    }, []);

    return (
        <HeaderContext.Provider value={[headerData]}>
            {props.children}
        </HeaderContext.Provider >
    );}
    */
