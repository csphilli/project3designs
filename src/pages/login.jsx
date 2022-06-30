import React from "react";
import Seo from "../components/Seo";
import * as styles from "../scss/loginPage.module.scss";
import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div>
            <Seo title="Login" />
            <section className={styles.section_container}>
                <aside className={styles.membership_info_container}>
                    <h2 className={styles.title}>Why become a member?</h2>
                    <p className={styles.subtitle}>
                        It's super easy to join and there are some excellent
                        reasons why you should consider doing so. The
                        non-exhaustive list includes
                    </p>
                    <ul className={styles.list}>
                        <li>
                            <strong>
                                5% lifetime discount on all purchases (on top of
                                any additional discounts)
                            </strong>
                        </li>
                        <li>Early product launch notice</li>
                        <li>Giveaways</li>
                        <li>Poll participation</li>
                    </ul>
                    <p className={styles.subtitle}>
                        More will be introduced as time goes on
                    </p>
                </aside>
                <main className={styles.main_container}>
                    <LoginForm />
                </main>
            </section>
        </div>
    );
}

export default Login;
