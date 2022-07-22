import React, {
    createContext,
    useState,
    useEffect,
    useMemo,
    useContext,
} from "react";
import { createProdObj, getProducts } from "../../lib";

const ProductContext = createContext([]);

const useProductContext = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProductContext was used outside of its Provider");
    }
    return context;
};

const ProductProvider = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            const prods = data.data.map((item) => createProdObj(item));
            setProducts(prods);
        };

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

export { ProductProvider, useProductContext };
