import React, { useEffect, useState } from "react";
import { getMongoProducts } from "../lib";
function Footer() {
  const [testProducts, setTestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = getMongoProducts();
      const products = await data;
      console.log(products.data.product_id);

      setTestProducts(products.data.product_id);
    };

    fetchProducts();
  }, []);
  return (
    <footer>
      <p>Copyright 2022 Project3 Designs</p>
      <p>{testProducts}</p>
      <p>Testing</p>
    </footer>
  );
}

export default Footer;
