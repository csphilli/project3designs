import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import * as styles from "../styling/hero.module.css";

export default function Home() {
    return (
        <div>
            <Layout pageId="home">
                <main className={`${styles.heroText}`}>
                    <Button />
                </main>
            </Layout>
        </div>
    );
}
