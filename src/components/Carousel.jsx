import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import * as styles from "../scss/carousel.module.scss";

function Carousel(props) {
    const { images } = props;

    if (images.length > 0) {
        return (
            <Splide
                aria-label="Our Favorite Images"
                className={styles.slider_container}
                options={{
                    rewind: true,
                    gap: "1rem",
                    speed: 1000,
                    height: "30rem",
                    width: "100%",
                }}
            >
                {images.map((item, index) => {
                    const image = getImage(item);
                    return (
                        <SplideSlide key={index}>
                            <GatsbyImage
                                key={index}
                                image={image}
                                className={styles.image}
                                alt={`Slide image ${index}`}
                            />
                        </SplideSlide>
                    );
                })}
            </Splide>
        );
    } else return null;
}

export default Carousel;
