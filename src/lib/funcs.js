const TOOLTIPS = {
    MAX_QTY: "Max Quantity in Cart",
    SOLD_OUT: "Sold Out",
};

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
    const limit =
        obj.inventory < obj.sale_limit ? obj.inventory : obj.sale_limit;
    return {
        ...obj,
        // quantity: 0,
        price: (Number(obj.unit_amount) / 100).toFixed(2),
        // sold_out: obj.inventory === 0 ? true : false,
        sale_limit: limit,
        // maxQty:
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

// Loads an existing shopping cart
// export const loadLocal = () => {
//     const local = JSON.parse(localStorage.getItem("cartItems"));
//     if (!local) return null;
//     return local.map((item) => item.value);
// };

// When loading a post page that contains product cart info, refreshes quantities from localStorage
// export const refreshQtyFromLocal = (prodList) => {
//     const local = JSON.parse(localStorage.getItem("cartItems"));
//     if (!local) return;
//     prodList.forEach((item1) => {
//         const exists = local.find((item2) => item2.key === item1.product_id);
//         if (!exists) return;
//         item1.quantity = exists.value.quantity;
//     });
// };

// Gets the total count items in cart for navbar cart icon
// export const getCartQty = () => {
//     const local = JSON.parse(localStorage.getItem("cartItems"));
//     if (local) {
//         return local.reduce((total, item) => total + item.value.quantity, 0);
//     } else return 0;
// };

// export const productsPageSorting = (products, column, order = "asc") => {
//     if (order === "asc") {
//         products.forEach((obj) => {
//             obj.product_list.sort((b, a) => b[`${column}`] - a[`${column}`]);
//         });
//     } else {
//         products.forEach((obj) => {
//             obj.product_list.sort((b, a) => a[`${column}`] - b[`${column}`]);
//         });
//     }
// };

// DLT? Used to assign text to the tooltip texts.
export const getTooltipText = (prod) => {
    switch (prod.tax_code_name) {
        case "General - Tangible Goods": {
            // if (prod.inventory < 1 || prod.quantity === prod.inventory)
            if (prod.inventory === 0 || prod.quantity === prod.inventory)
                return TOOLTIPS.SOLD_OUT;
            else if (prod.quantity >= prod.max_qty) return TOOLTIPS.MAX_QTY;
            break;
        }
        case "e-book": {
            if (prod.quantity >= prod.max_qty) return TOOLTIPS.MAX_QTY;
            break;
        }
        default: {
            return "Invalid Tooltip";
        }
    }
};
