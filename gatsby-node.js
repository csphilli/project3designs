"use strict";
const path = require("path");

// exports.createPages = async ({ graphql, actions }) => {
exports.createPages = async ({ graphql, actions }) => {
    const { data } = await graphql(`
        query MyQuery {
            allMarkdownRemark {
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

    // Add another area here for adding products to their own pages using data obtained from DB download. Just the template below
};

/*
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      shopify: allShopifyProduct {
        nodes {
          handle
        }
      }
      contentful: allContentfulBlogPost {
        nodes {
          slug
        }
      }
    }
  `)

  const shopifyTemplate = require.resolve(`./src/templates/product-page.js`)
  const contentfulTemplate = require.resolve('./src/templates/blog.js')

  if (result.errors) {
    return
  }

  result.data.shopify.nodes.forEach(product => {
    const id = product.handle

    createPage({
      path: `/product/${id}/`,
        component: shopifyTemplate,
        context: {
            id,
        },
    })
  })

  result.data.contentful.nodes.forEach(post => {
    createPage ({
      component: contentfulTemplate,
      path: `/blog/${post.slug}`,
      context: {
        slug: post.slug
      }
    })
  })
}
  */
