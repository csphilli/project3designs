import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "../../scss/projectsPages/pageBanner.module.scss";
import IconBulletList from "../lists/IconBulletList";

function PageBanner(props) {
    const { data, bullets } = props;
    const base = data.markdownRemark.frontmatter;
    const banner_image = getImage(
        base.post_banner.childImageSharp.gatsbyImageData
    );
    return (
        <div className={styles.heading_container}>
            <div className={styles.title_banner_container}>
                <GatsbyImage
                    className={styles.banner_image}
                    image={banner_image}
                    alt="image illustrating banner"
                />
            </div>
            <div className={styles.publishing_container}>
                {bullets.map((obj, index) => (
                    <IconBulletList
                        key={index}
                        icon={obj.icon}
                        text={obj.text}
                    />
                ))}
            </div>
            <h2 className={styles.title}>{base.title}</h2>
        </div>
    );
}

export default PageBanner;
