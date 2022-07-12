import React from "react";
import Seo from "../components/Seo";
import * as styles from "../scss/hero.module.scss";

export default function Home() {
    return (
        <div>
            <Seo title="Home" />
            <section className={styles.heroContainer}>
                <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras et lobortis lacus. Donec at tempus orci. Vivamus
                    tristique, justo sed gravida blandit, ligula lectus
                    sollicitudin nisi, ut congue neque felis sed augue. Interdum
                    et malesuada fames ac ante ipsum primis in faucibus.
                    Maecenas a eros commodo, tincidunt nunc ultrices, feugiat
                    nisl. Vestibulum nulla ipsum, dictum sit amet iaculis nec,
                    vehicula sit amet libero. Integer porta tristique enim.
                    Proin porttitor tristique consectetur. Sed pulvinar, sapien
                    vitae porttitor tincidunt, ipsum justo tempor tortor, a
                    bibendum nunc nibh at libero. Donec efficitur lacus
                    condimentum erat posuere, eu scelerisque urna scelerisque.
                    Sed accumsan sapien eget lacus euismod pulvinar. Maecenas
                    ornare nibh eu suscipit aliquet. Nulla et leo dignissim,
                    pharetra lacus eget, tempor tortor.
                </h2>
                <p>
                    Orci varius natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Nulla non mauris id nibh
                    mollis posuere. Fusce in dictum metus. Vestibulum quis
                    volutpat arcu. Nulla non dui vitae dolor placerat vulputate
                    id in ex. Sed id augue volutpat, mattis enim eget, laoreet
                    est. Mauris interdum placerat tellus non eleifend. In
                    tristique dictum lorem eget tempor.
                </p>
            </section>
        </div>
    );
}
