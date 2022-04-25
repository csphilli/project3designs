import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import * as styles from "../styling/home.module.css";

export default function Home() {
    return (
        <div>
            <Layout page="home">
                <main className={styles.heroText}>
                    <h2>
                        Find inspiration with projects, articles, and video
                        tutorials for any level of DIY skill
                    </h2>
                    <h3>
                        Navigate directly to the pages above or learn more about
                        how you can take on a project <em>yourself</em> by
                        clicking this button
                    </h3>
                    <Button />
                </main>
            </Layout>
        </div>
    );
}
