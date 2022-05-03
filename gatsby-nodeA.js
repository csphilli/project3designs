"use strict";
const path = require("path");
exports.createPages = async ({ graphql, actions }) => {
    const data = await graphql(`
        query Details {
            allMarkdownRemark {
                nodes {
                    frontmatter {
                        slug
                        site_category
                    }
                }
            }
        }
    `);

    console.log(data);
    // data.allMarkdownRemark.nodes.forEach((node) => {
    //     actions.createPage({
    //         path: `/${node.frontmatter.site_category}/${node.frontmatter.slug}`,
    //         component: path.resolve(
    //             `./src/templates/${node.frontmatter.site_category}s-details.jsx`
    //         ),
    //         context: { slug: node.frontmatter.slug },
    //     });
    // });
};
