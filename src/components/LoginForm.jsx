import React from "react";
import { BsGoogle, BsFacebook, BsCheck } from "react-icons/bs";
import { FiMail, FiKey, FiLock } from "react-icons/fi";
import * as styles from "../scss/loginForm.module.scss";

const handleForgottenPW = () => {
    console.log(`popup Modal for forgotten PW`);
};

const handleSignUp = () => {
    console.log(`Popup modal for signing up`);
};

function LoginForm() {
    return (
        <div className={styles.login_container}>
            <p className={styles.login_subject_text}>Sign in with</p>
            <div className={styles.oauth_container}>
                <BsGoogle className={styles.icon} />
                <p className={styles.oauth_text}>sign up with Google</p>
            </div>
            <div className={styles.oauth_container}>
                <BsFacebook className={styles.icon} />
                <p className={styles.oauth_text}>sign up with Facebook</p>
            </div>
            <div className={styles.divider_container}>
                <p className={styles.divider_text}>or continue with</p>
            </div>
            <form>
                <label htmlFor="email">E-mail Address</label>
                <div className={styles.input_container}>
                    <FiMail className={styles.input_icon} />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                    ></input>
                </div>
                <label htmlFor="password">Password</label>
                <div className={styles.input_container}>
                    <FiKey className={styles.input_icon} />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                    ></input>
                </div>
                {/* <div className={styles.utility_container}>
                    <div className={styles.left_side}>
                        <input
                            className={styles.checkbox_input}
                            type="checkbox"
                            id="remember"
                            name="remember"
                        />
                        <label className={styles.label_text} htmlFor="remember">
                            Remember Me
                        </label>
                    </div>
                    <button
                        onClick={handleForgottenPW}
                        className={styles.text_button}
                    >
                        Forgot password?
                    </button>
                </div> */}
                <div className={styles.btn_container}>
                    <FiLock className={styles.sign_in_icon} />
                    Sign in
                </div>
            </form>

            <div className={styles.sign_up_forgot_container}>
                <button className={styles.text_button} onClick={handleSignUp}>
                    Don't have an account? Sign up!
                </button>
                <button
                    className={styles.text_button}
                    onClick={handleForgottenPW}
                >
                    Forgot password?
                </button>
            </div>
        </div>
    );
}

export default LoginForm;

/* REMEMBER ME FUNCTIOANLITY

Once you receive a jwt token, you can set an "expiry time" for your jwt token. For example, if I receive a token with id: "abc_token_123", I will create an object inside sessionstorage, localstorage, or even cookies with a key called expireTime (for example). And I will use a useEffect hook on the main file (App.js) to watch for the time, if the time exceeds the expiry time, log the user out, otherwise, if the expiry key is present inside your storage, keep the user logged in.

*/

/*
<form className={styles.modal_form} onSubmit={handleAdd}>
                        <label className={styles.selector_title} htmlFor="size">
                            Size:
                        </label>
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
                            <input
                                type="number"
                                className={styles.quantity_selector}
                                name="quantity"
                                min="1"
                                max={maxQty}
                                defaultValue="1"
                            ></input>
                            <button
                                className={styles.submit_button}
                                type="submit"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </form>
                    */
