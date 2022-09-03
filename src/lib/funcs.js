const NETLIFY = {
  SINGLE: "/.netlify/functions/getProduct",
  ALL: "/.netlify/functions/getAllProducts",
  JWT: "/.netlify/functions/generateJWT",
};

// Used to generate a JWT
export const generateJWT = async () => {
  const response = await fetch(NETLIFY.JWT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jwtData = await response.json();
  console.log(`TOKEN: ${jwtData}`);
};

// Helper function to create product obljects and then add custom properties. Src: products/index.jsx file
export const createProdObj = (obj) => {
  const limit = obj.inventory < obj.sale_limit ? obj.inventory : obj.sale_limit;
  return {
    ...obj,
    price: (Number(obj.unit_amount) / 100).toFixed(2),
    sale_limit: limit,
  };
};

// Creates an object of key value pairs from a URL string.
// const getRedirectObj = (redirectString) =>
//     redirectString.split("&").reduce((acc, keyValuePair) => {
//         const [key, value] = keyValuePair.split("=");
//         acc[key] = value;
//         return acc;
//     }, {});

// Calculates the estimated read time given the number of words divided by an average value of 130
export const readTime = (text) => {
  const time = Math.ceil((text.split(" ").length + 1) / 130);
  if (time <= 1) return `${time} minute`;
  return `${time} minutes`;
};

// Gets all products
export const getProducts = async () => {
  const res = await fetch(NETLIFY.ALL, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${process.env.GATSBY_P3D_AUTH_TOKEN}`,
    },
  }).then((resp) => resp.json());
  if (res.status !== 200) {
    console.log(res.message);
  }
  return res;
};

// Gets products grouped by p3_id. Post request so that I can specify queury parameters
export const getProduct = async (p3_id) => {
  const res = await fetch(NETLIFY.SINGLE, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${process.env.GATSBY_P3D_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ search: p3_id }),
  }).then((resp) => resp.json());
  if (res.status !== 200) {
    console.log(res.message);
  }
  return res;
};

// Formats the product pricing. Default is eur.
export const formattedPrice = (value, ccy = "eur") => {
  return Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: ccy,
    maximumSignificantDigits: 5,
  }).format(value);
};
