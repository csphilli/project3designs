/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    /* Your site config here */
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-remark`,
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 800,
                            disableBgImageOnAlpha: true,
                            wrapperStyle: `display: flex; justify-content: center;align-items:center`,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `headPages`,
                path: `${__dirname}/src/headPages/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pageBanners`,
                path: `${__dirname}/src/images/pageBanners/`,
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: `${__dirname}/src/images/pageIcons/`, // See below to configure properly
                },
            },
        },
    ],
    siteMetadata: {
        pages: [
            {
                id: "home",
                title: "Project3 Studio | Home",
                description: "Improve your DIY skills with Project3 Studio",
            },
            {
                id: "projects",
                title: "Project3 Studio | Projects",
                description: "Get information on all the projects we've done",
            },
            {
                id: "videos",
                title: "Project3 Studio | Videos",
                description: "All the videos we've done for your benefit",
            },
            {
                id: "articles",
                title: "Project3 Studio | Articles",
                description: "All the reading you can handle about DIY",
            },
            {
                id: "about",
                title: "Project3 Studio | About",
                description: "Learn more about Project3 Studio",
            },
        ],
    },
};
