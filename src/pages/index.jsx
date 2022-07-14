import React from "react";
import Seo from "../components/Seo";
import * as styles from "../scss/hero.module.scss";

export default function Home() {
    return (
        <main>
            <Seo title="Home" />
            <section className={styles.heroContainer}>
                <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec accumsan lacus sem, et rutrum neque eleifend id.
                    Aliquam aliquam vel purus in vulputate. Praesent lacinia
                    elit et blandit tempus. Aliquam sed ultrices augue. Proin
                    posuere posuere imperdiet. Cras id odio libero. Suspendisse
                    porttitor odio sem, sed blandit mi consequat in. Etiam sit
                    amet convallis leo, non ullamcorper risus. Aliquam aliquam
                    lacus non ligula feugiat, in pharetra turpis malesuada.
                    Fusce ut neque augue. Ut metus turpis, finibus ut neque ut,
                    feugiat hendrerit dolor.
                </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec accumsan lacus sem, et rutrum neque eleifend id.
                    Aliquam aliquam vel purus in vulputate. Praesent lacinia
                    elit et blandit tempus. Aliquam sed ultrices augue. Proin
                    posuere posuere imperdiet. Cras id odio libero. Suspendisse
                    porttitor odio sem, sed blandit mi consequat in. Etiam sit
                    amet convallis leo, non ullamcorper risus. Aliquam aliquam
                    lacus non ligula feugiat, in pharetra turpis malesuada.
                    Fusce ut neque augue. Ut metus turpis, finibus ut neque ut,
                    feugiat hendrerit dolor.
                </p>
            </section>
        </main>
    );
}
