/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    /* site config */
    siteMetadata: {
        siteName: "Project3 Designs",
        title: "Project3 Designs - Custom Luxury Designs",
        description:
            "Woodworker based in Finland, I design and build custom luxury pieces either through commission or own ambition as well as providing tutorials with writing and video",
        author: "Christopher Phillips",
        keywords: [
            "Project3 Designs",
            "woodworking",
            "luxury woodworking",
            "building",
            "custom woodworking",
            "woodworking tutorials",
            "custom luxury designs",
            "made in Finland",
        ],
        siteUrl: "https://www.project3designs.com",
        navLinks: [
            { id: "projects", path: "/projects/" },
            { id: "videos", path: "/videos" },
            { id: "products", path: "/products" },
            { id: "cart", path: "/cart" },
        ],
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-remark`,
        `gatsby-remark-images`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-netlify`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `projects`,
                path: `${__dirname}/src/pages/projects/`,
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
    ],
};
