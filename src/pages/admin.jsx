import React, { useState, useEffect } from "react";
import { useProductContext } from "../components/providers/ProductProvider";
import * as styles from "../scss/admin/admin.module.scss";
import LoadingSpinner from "../components/LoadingSpinner";
import AdminProductCard from "../components/admin/AdminProductCard";

function Admin() {
  const { products: aProducts } = useProductContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let list = [];
    aProducts?.forEach((item) => {
      const exists = list.find((obj) => obj.p3_id === item.p3_id);
      if (exists) {
        exists.product_list.push(item);
      } else
        list.push({
          p3_id: item.p3_id,
          product_list: new Array(item),
        });
    });
    if (list.length > 0) {
      setProducts(list);
      setLoading(false);
    }
  }, [aProducts]);

  return (
    <main>
      <h2>Admin Panel - Measure Twice, Cut Once™️</h2>
      {loading ? (
        <div className={styles.loading_container}>
          <LoadingSpinner type="products" />
        </div>
      ) : (
        <section className={styles.edit_section}>
          <div className={styles.instrux}>
            <h3>Edit Product</h3>
            <p>Click on product to edit.</p>
          </div>
          <div className={styles.edit_products_container}>
            {products.map((list) =>
              list.product_list.map((item) => (
                <AdminProductCard key={item.product_id} product={item} />
              ))
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default Admin;
