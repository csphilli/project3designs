import React, { createContext, useState, useEffect, useMemo } from "react";
import { createProdObj, getProducts } from "../../lib";

export const ProductContext = createContext([]);
export const ProductProvider = (props) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const data = await getProducts();
        const prods = data.data.map((item) => createProdObj(item));
        setProducts(prods);
    };

    useEffect(() => {
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
