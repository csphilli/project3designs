"use strict";
const path = require("path");
exports.createPages = async ({ graphql, actions }) => {
    const { data } = await graphql(`
        query MyQuery {
            allMarkdownRemark(
                filter: { frontmatter: { site_category: { eq: "projects" } } }
            ) {
                nodes {
                    frontmatter {
                        site_category
                        slug
                    }
                }
            }
        }
    `);

    data.allMarkdownRemark.nodes.forEach((node) => {
        actions.createPage({
            path: `/${node.frontmatter.site_category}/${node.frontmatter.slug}`,
            component: path.resolve(
                `./src/templates/${node.frontmatter.site_category}-details.jsx`
            ),
            context: { slug: node.frontmatter.slug },
        });
    });
};
