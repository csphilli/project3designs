import React from "react";
import { learnMoreData } from "./LearnMoreData";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import LearnMoreUl from "./LearnMoreUl";
import * as styles from "../scss/LearnMoreCard.module.scss";

function LearnMoreCard() {
    console.log(learnMoreData[0].thumbnail);
    const query = useStaticQuery(graphql`
        query LearnMoreCardQuery {
            allFile(filter: { relativeDirectory: { eq: "thumbnails" } }) {
                nodes {
                    childImageSharp {
                        gatsbyImageData(aspectRatio: 1.6, width: 600)
                    }
                    id
                    name
                }
            }
        }
    `);

    const images = query.allFile.nodes.filter((item) =>
        learnMoreData.find((element) => element.thumbnail === item.name)
    );
    return (
        <div>
            {learnMoreData.map((item, index) => {
                return (
                    <div
                        key={images[index].id}
                        className={styles.card_container}
                    >
                        <GatsbyImage
                            className={styles.card_image}
                            image={
                                images[index].childImageSharp.gatsbyImageData
                            }
                            alt={item.alt_text}
                        />
                        <h3 className={styles.title}>{item.title}</h3>
                        <LearnMoreUl data={item} index={index} />
                    </div>
                );
            })}
        </div>
    );
}

export default LearnMoreCard;
