// "use strict";
const fetch = require("node-fetch");

const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK);

// const createClient = require("supabase-js");

// const supabase = createClient(
//     GATSBY_SUPABASE_URL,
//     process.env.GATSBY_SUPABASE_KEY
// );
const endpointSecret =
    "whsec_0286817c32a272cf74a6260d4ebcf58cfa2dc19c850cb0c4ff8d24f734d9999b";

// INSERT MANY ROWS
// curl -X POST 'https://teupdewkszzkrezbvmfe.supabase.co/rest/v1/products' \
// -H "apikey: SUPABASE_KEY" \
// -H "Authorization: Bearer SUPABASE_KEY" \
// -H "Content-Type: application/json" \
// -d '[{ "some_column": "someValue" }, { "other_column": "otherValue" }]'

exports.handler = async (event) => {
    try {
        const stripeEvent = stripe.webhooks.constructEvent(
            event.body,
            event.headers["stripe-signature"],
            endpointSecret
        );

        if (stripeEvent.type === "product.created") {
            const {
                id: product_id,
                active,
                default_price,
                description: desc,
                images,
                name,
                url: project_url,
                created,
                updated,
            } = stripeEvent.data.object;

            const api = await fetch(
                `https://teupdewkszzkrezbvmfe.supabase.co/rest/v1/products?select=*`,
                {
                    method: "GET",
                    headers: {
                        apiKey: `${process.env.GATSBY_SUPABASE_KEY}`,
                        Authorization: `Bearer ${process.env.GATSBY_SUPABASE_KEY}`,
                    },
                }
            )
                .then((resp) => resp.json())
                .then((res) => console.log(res));

            // curl 'https://teupdewkszzkrezbvmfe.supabase.co/rest/v1/products?select=*' \
            // -H "apikey: SUPABASE_KEY" \
            // -H "Authorization: Bearer SUPABASE_KEY"

            // const { data, error } = await fetch(
            //     `${process.env.GATSBY_SUPABASE_URL}/rest/v1/products`,
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             apiKey: process.env.GATSBY_SUPABASE_KEY,
            //             Authorization: Bearer`${process.env.GATSBY_SUPABASE_KEY}`,
            //         },
            //     }
            // )
            //     .then((resp) => resp.json())
            //     .then((item) => console.log(item));

            // console.log(error);

            // const { category_id, max_qty, inventory_id } =
            //     stripeEvent.data.object.metadata;
            // const { data, error } = await supabase
            //     .from("products")
            //     .insert([
            //         { product_id: product_id },
            //         { default_price: default_price },
            //         { name: name },
            //         { desc: desc },
            //         { img_url: images[0] },
            //         { project_url: project_url },
            //         { active: active },
            //         { created: created },
            //         { updated: updated },
            //     ]);
            // if (error) {
            //     console.error("Error with Supabase: ${error}");
            // } else {
            //     console.log(data);
            // }
            return {
                statusCode: 200,
                // body: JSON.stringify(`Returning BS string`),
                body: JSON.stringify(api),
            };
        }
    } catch (error) {
        console.error("ERROR:", error);
    }
};

/*
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51Kx9jIFM6e0F56a9tqToopmzuxCLKahQ7Chf00R8CrZsJc5epikeM67diZHB1MjUFuzZmV2bm6VnWTsh2qElujK700uNiEif2g');

// If you are testing your webhook locally with the Stripe CLI you
// can find the endpoint's secret by running `stripe listen`
// Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
const endpointSecret = 'whsec_...';

// This example uses Express to receive webhooks
const app = require('express')();

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

*/
