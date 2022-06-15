import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import * as styles from "../scss/hero.module.scss";

function NoDice() {
    return (
        <div>
            <Layout pageId="fourOfour">
                <Seo title="404 Page Not Found" />
                <section className={styles.heroContainer}>
                    <h2>404: Page Not Found</h2>
                    <p>
                        We're terribly sorry but the page you've tried to access
                        isn't located on our site anywhere. If you typed it
                        manually, check to make sure you didn't make any typos.
                    </p>
                    <p>
                        If you got here via clicking a link, would you mind
                        sending us a quick message about this mixup? The form
                        below is dedicated to just that. Your feedback would
                        help us fix the error.
                    </p>
                </section>
            </Layout>
        </div>
    );
}

export default NoDice;
