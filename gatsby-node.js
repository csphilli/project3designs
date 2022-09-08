"use strict";
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query MyQuery {
      allMarkdownRemark {
        nodes {
          frontmatter {
            page_root
            project_link
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: `/${node.frontmatter.page_root}/${node.frontmatter.project_link}`,
      component: path.resolve(
        `./src/templates/${node.frontmatter.page_root}-details.jsx`
      ),
      context: {
        project_link: node.frontmatter.project_link,
        dir: `posts/${node.frontmatter.project_link}/images/carousel`,
      },
    });
  });
};
