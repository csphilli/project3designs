import React, { useEffect, useState } from "react";
import * as styles from "../scss/productModal.module.scss";
import { formattedPrice, getTooltipText } from "../lib";
import { BsCart } from "react-icons/bs";
import { Link } from "gatsby";
import QtyButton from "./productForm/QtyButton";
/* TODO
        2) Implement custom up/down arrows for quantity selector
        3) Implement custom down arrow inside selection box.
        7) Instead of keeping track of maxQty according to selection.quantity, the form functionality should add to an order Item instead of product.quantity

*/

const getMax = (inv, max_qty, qty) => {
    const max = inv < max_qty ? inv : max_qty;
    return max - qty;
};

function ProductModal(props) {
    const { product, toggleModal } = props;
    const [selection, setSelection] = useState(product.product_list[0]);
    // const [maxQty, setMaxQty] = useState(() => {
    //     const max =
    //         selection.inventory < selection.max_qty
    //             ? selection.inventory
    //             : selection.max_qty;
    //     return max - selection.quantity;
    // });
    const [maxQty, setMaxQty] = useState(() =>
        getMax(selection.inventory, selection.max_qty, selection.qty)
    );

    // The cart Icon in the navBar uses the amount of items in the cart
    // const { order } = useContext(OrderItemsContext);

    // const [orderItems, setOrderItems] = order;

    useEffect(() => {
        // setMaxQty(() => {
        //     const max =
        //         selection.inventory < selection.max_qty
        //             ? selection.inventory
        //             : selection.max_qty;
        //     return max - selection.quantity;
        // });
        setMaxQty(() =>
            getMax(selection.inventory, selection.max_qty, selection.qty)
        );
    }, [selection]);

    const updateQty = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        // const data = {
        //     product_id: form.get("product_id"),
        //     quantity: Number(form.get("quantity")),
        // };

        selection.quantity = form.get("quantity");
        setMaxQty((prevState) => prevState - selection.quantity);
    };

    const handleChange = (e) => {
        setSelection(
            product.product_list.find(
                (item) => item.product_id === e.target.value
            )
        );
    };

    return (
        <>
            <div
                className={styles.modal_backdrop}
                onClick={() => {
                    toggleModal();
                }}
            />
            <div className={styles.modal}>
                <button
                    className={styles.modal_close_btn}
                    onClick={() => toggleModal()}
                >
                    X
                </button>
                <div className={styles.image_container}>
                    <img
                        className={styles.image}
                        src={selection.image_url}
                        alt="pic of product"
                    />
                </div>
                <div className={styles.text_container}>
                    <h3 className={styles.product_name}>{selection.name}</h3>
                    <p className={styles.price}>
                        {formattedPrice(selection.price)}
                    </p>
                    <p>{selection.desc}</p>
                    <form className={styles.modal_form} onSubmit={updateQty}>
                        <label htmlFor="size">Size:</label>
                        <select
                            className={styles.selector_menu}
                            name="product_id"
                            defaultValue={selection.size}
                            onChange={handleChange}
                        >
                            {product.product_list.map((item) => (
                                <option key={item.id} value={item.product_id}>
                                    {item.size}
                                </option>
                            ))}
                        </select>
                        <label
                            className={styles.quantity_title}
                            htmlFor="quantity"
                        >
                            Available:{" "}
                            {maxQty
                                ? maxQty
                                : getTooltipText(
                                      product.product_list.find(
                                          (item) => item.id === selection.id
                                      )
                                  )}
                        </label>

                        <div
                            className={
                                maxQty === 0
                                    ? styles.add_to_cart_container_prevent
                                    : styles.add_to_cart_container
                            }
                        >
                            <QtyButton max={maxQty} />
                            <button
                                className={styles.submit_button}
                                type="submit"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </form>
                </div>
                {selection.quantity > 0 && (
                    <Link
                        onClick={() => {
                            document.body.style.overflow = "unset";
                        }}
                        to="/cart"
                        data-qty={selection.quantity}
                        className={styles.link_container}
                    >
                        <BsCart className={styles.cart_icon} />
                    </Link>
                )}
            </div>
        </>
    );
}

export default ProductModal;
