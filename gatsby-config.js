/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    /* Your site config here */
    siteMetadata: {
        title: "Project3 WoodWorking - Custom woodworking and tutorials",
        description:
            "Woodworker based in Finland, I design and build custom luxury pieces either through commission or own ambition as well as providing tutorials through writing and video",
        author: "Christopher Phillips",
        keywords: [
            "Project3 Woodworking",
            "woodworking",
            "luxury woodworking",
            "building",
            "custom woodworking",
            "woodworking tutorials",
        ],
        siteUrl: "https://www.project3woodworking.com",
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-remark`,
        `gatsby-remark-images`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sass`,
        // {
        //     resolve: `gatsby-source-filesystem`,
        //     options: {
        //         name: `headPages`,
        //         path: `${__dirname}/src/headPages/`,
        //     },
        // },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `projects`,
                path: `${__dirname}/src/projects/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `videos`,
                path: `${__dirname}/src/videos/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images/`,
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: `${__dirname}/src/images/pageIcons/`,
                },
            },
        },
        // {
        //     resolve: `gatsby-source-stripe`,
        //     options: {
        //         objects: ["Product", "Price"],
        //         secretKey: process.env.GATSBY_STRIPE_SK,
        //         downloadFiles: true,
        //     },
        // },
    ],
};
