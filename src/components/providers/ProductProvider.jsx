import React, { createContext, useState, useEffect, useMemo } from "react";
import { getProducts } from "../../lib";

export const ProductContext = createContext(null);
export const ProductProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        fetchProds();
        return () => {
            active = false;
        };

        async function fetchProds() {
            const list = await getProducts();
            if (!active) return;
            setProducts(list.data);
            setLoading(false);
        }
    }, []);

    const productProviderValues = useMemo(
        () => ({
            products,
            loading,
        }),
        [products, loading]
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
