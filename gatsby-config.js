/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    /* Your site config here */
    plugins: [],
    siteMetadata: {
        pages: {
            home: {
                title: "Project3 Studio | Home",
                description: "Improve your DIY skills with Project3 Studio",
            },
            projects: {
                title: "Project3 Studio | Projects",
                description: "Get information on all the projects we've done",
            },
            videos: {
                title: "Project3 Studio | Videos",
                description: "All the videos we've done for your benefit",
            },
            articles: {
                title: "Project3 Studio | Articles",
                description: "All the reading you can handle about DIY",
            },
            about: {
                title: "Project3 Studio | About",
                description: "Learn more about Project3 Studio",
            },
        },

        navBar: {
            title: "Project3 Studio",
            links: ["home", "projects", "videos", "articles", "about"],
        },
    },
};
