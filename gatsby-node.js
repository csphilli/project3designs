"use strict";
const path = require("path");
exports.createPages = async ({ graphql, actions }) => {
    const { data } = await graphql(`
        query MyQuery {
            allMarkdownRemark(
                filter: { frontmatter: { page_category: { eq: "sub" } } }
            ) {
                nodes {
                    frontmatter {
                        page_root
                        slug
                    }
                }
            }
        }
    `);

    data.allMarkdownRemark.nodes.forEach((node) => {
        actions.createPage({
            path: `/${node.frontmatter.page_root}/${node.frontmatter.slug}`,
            component: path.resolve(
                `./src/templates/${node.frontmatter.page_root}-details.jsx`
            ),
            context: { slug: node.frontmatter.slug },
        });
    });
};

// query MyQuery {
// 	allMarkdownRemark(
// 		filter: { frontmatter: { site_category: { eq: "projects" } } }
// 	) {
// 		nodes {
// 			frontmatter {
// 				site_category
// 				slug
// 			}
// 		}
// 	}
// }
