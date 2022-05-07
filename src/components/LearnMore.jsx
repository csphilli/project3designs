import React from "react";
import HeadPageLayout from "./HeadPageLayout";
import * as styles from "../scss/learnMore.module.scss";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BiRuler, BiMoney, BiListOl, BiWrench, BiDollar } from "react-icons/bi";
import { IoHammerOutline, IoRibbonOutline } from "react-icons/io5";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import Button from "./Button";
import { learnMoreData } from "./LearnMoreData";
import LearnMoreCard from "./LearnMoreCard";

function LearnMore() {
    const buttonPlans = {
        text: "Build Plans",
        link: "/products",
    };
    const buttonCourses = {
        text: "Courses",
        link: "/products",
    };
    const data = useStaticQuery(graphql`
        query LearnMoreQuery {
            markdownRemark(frontmatter: { page_id: { eq: "learn-more" } }) {
                frontmatter {
                    card_img_1 {
                        childImageSharp {
                            gatsbyImageData(aspectRatio: 1.6, width: 600)
                        }
                    }
                    card_img_2 {
                        childImageSharp {
                            gatsbyImageData(aspectRatio: 1.6, width: 600)
                        }
                    }
                }
                html
            }
        }
    `);
    const img1 = getImage(
        data.markdownRemark.frontmatter.card_img_1.childImageSharp
            .gatsbyImageData
    );
    const img2 = getImage(
        data.markdownRemark.frontmatter.card_img_2.childImageSharp
            .gatsbyImageData
    );

    const { html } = data.markdownRemark;
    return (
        <div>
            <div className={styles.html_container}>
                <div
                    className={styles.html}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
            <div className={styles.learn_more_container}>
                <LearnMoreCard />
                {/* <div className={styles.card_container}>
                    <GatsbyImage
                        className={styles.card_image}
                        image={img1}
                        alt="About image 1"
                    />
                    <div className={styles.content_container}>
                        <h3 className={styles.title}>Build Plans</h3>

                        <ul className={styles.list_container}>
                            <div className={styles.item_container}>
                                <BiListOl className={styles.icon} />
                                <li className={styles.list_item}>
                                    Bill of materials
                                </li>
                            </div>
                            <div className={styles.item_container}>
                                <BiMoney className={styles.icon} />
                                <li className={styles.list_item}>
                                    Estimated cost of materials
                                </li>
                            </div>
                            <div className={styles.item_container}>
                                <BiRuler className={styles.icon} />
                                <li className={styles.list_item}>Dimensions</li>
                            </div>
                            <div className={styles.item_container}>
                                <BiWrench className={styles.icon} />
                                <li className={styles.list_item}>
                                    Detailed assembly guide
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div className={styles.cost_container}>
                        <div className={styles.cost_context}>
                            <h4 className={styles.cost_title}>Total Cost</h4>
                            <div className={styles.cost_figures}>
                                <BiDollar className={styles.cost_icon} />
                                <p className={styles.cost_text}>
                                    Free & Paid options available
                                </p>
                            </div>
                            <div className={styles.btn_container}>
                                <Button data={buttonPlans} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.card_container}>
                    <GatsbyImage
                        className={styles.card_image}
                        image={img2}
                        alt="About image 2"
                    />
                    <div className={styles.content_container}>
                        <h3 className={styles.title}>Courses</h3>

                        <ul className={styles.list_container}>
                            <div className={styles.item_container}>
                                <BsFileEarmarkPdf className={styles.icon} />
                                <li className={styles.list_item}>
                                    Build Plans
                                </li>
                            </div>
                            <div className={styles.item_container}>
                                <AiOutlineYoutube className={styles.icon} />
                                <li className={styles.list_item}>
                                    Video of every step
                                </li>
                            </div>
                            <div className={styles.item_container}>
                                <IoHammerOutline className={styles.icon} />
                                <li className={styles.list_item}>
                                    Tool and process guidance
                                </li>
                            </div>
                            <div className={styles.item_container}>
                                <IoRibbonOutline className={styles.icon} />
                                <li className={styles.list_item}>
                                    Exclusive content
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div className={styles.cost_container}>
                        <div className={styles.cost_context}>
                            <h4 className={styles.cost_title}>Total Cost</h4>
                            <div className={styles.cost_figures}>
                                <BiDollar className={styles.cost_icon} />
                                <p className={styles.cost_text}>
                                    Free & Paid options available
                                </p>
                            </div>
                            <div className={styles.btn_container}>
                                <Button data={buttonCourses} />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default LearnMore;
