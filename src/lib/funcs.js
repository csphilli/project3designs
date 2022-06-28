const TOOLTIPS = {
    MAX_QTY: "Max Quantity in Cart",
    SOLD_OUT: "Sold Out",
};

// Used to generate a JWT
export const generateJWT = async () => {
    const response = await fetch("/.netlify/functions/generateJWT", {
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
    return {
        ...obj,
        quantity: 0,
        price: (Number(obj.unit_amount) / 100).toFixed(2),
        sold_out: obj.inventory === 0 ? true : false,
    };
};

// DELETE
// Simple function to handle adding items to cart. Src: products/index.jsx file
export const onAdd = (item, quantity) => {
    if (isClickAllowed(item) === true) {
        item.quantity += quantity;
        // item.quantity++;
        // saveToLocal(item.id, item);
    }
};

// DELETE
// Simple function to handle removing items from cart. Src: products/index.jsx file
export const onMinus = (item) => {
    if (item.quantity >= 1) {
        item.quantity--;
        // saveToLocal(item.id, item);
    }
};

// DELETE?
export const myFetch = async (url, type, body) => {
    console.log(`handling myFetch. url: ${url}, type: ${type}, body: ${body}`);

    const response = await fetch(url, {
        method: type,
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return response;
};

// Loads in the products from the graphql query. Calls the sort algorithm, and then updates the quantities of the products from the localStorage to repopulate the shopping cart. Finally it sets the products state.

export const fetchProducts = async () => {
    const products = await fetch(`/.netlify/functions/get_products`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.FORM_TOKEN}`,
        },
    }).then((resp) => resp.json());

    return products;
};

// Formats the product pricing. Default is eur.
export const formattedPrice = (value, ccy = "eur") => {
    return Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: ccy,
        maximumSignificantDigits: 5,
    }).format(value);
};

// DELETE Used to check if buttons can be clicked.
export const isClickAllowed = (product) => {
    return (
        product.quantity < parseInt(product.max_qty) && product.inventory >= 1
    );
};

// Saves a key and value pair to local storage. Will update the quantity
export const saveToLocal = (products) => {
    let local = [];
    products.forEach((list) =>
        list.product_list.forEach((prod) => {
            local.push({ key: prod.id, value: prod });
        })
    );
    localStorage.setItem("cartItems", JSON.stringify(local));
};

// Updates the quantities that were saved to the local storage for repopulating the cart contents if a user leaves the page before checking out.
export const updateFromLocal = (products) => {
    const local = JSON.parse(localStorage.getItem("cartItems"));
    if (local) {
        products.forEach((list) => {
            list.product_list.forEach((item) => {
                const prod = local.find((prod) => prod.key === item.id);
                if (prod) {
                    item.quantity = prod.value.quantity;
                }
            });
        });
    }
};

// Will be a switch case statement later
export const sortProducts = (products) => {
    products.forEach((obj) => {
        obj.product_list.sort((b, a) => b.price - a.price);
    });
};

// Used to assign text to the tooltip texts.
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
