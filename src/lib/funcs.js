// Helper function to create product obljects and then add custom properties. Src: products/index.jsx file
export const createProdObj = (obj) => {
    return {
        ...obj,
        quantity: 0,
        price: (Number(obj.unit_amount) / 100).toFixed(2),
    };
};

// Simple function to handle adding items to cart. Src: products/index.jsx file
export const onAdd = (item) => {
    if (isClickAllowed(item) === true) {
        item.quantity++;
        saveToLocal(item.id, item);
    }
};

// Simple function to handle removing items from cart. Src: products/index.jsx file
export const onMinus = (item) => {
    if (item.quantity >= 1) {
        item.quantity--;
        saveToLocal(item.id, item);
    }
};

// Loads in the products from the graphql query. Calls the sort algorithm, and then updates the quantities of the products from the localStorage to repopulate the shopping cart. Finally it sets the products state.

export const fetchProducts = async () => {
    const products = await fetch(`/.netlify/functions/get_products`, {
        method: "GET",
        "Content-type": "application/json",
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

// Used to check if buttons can be clicked.
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
// export const sortProducts = (products) => {
//     products.forEach((obj) => {
//         obj.product_list.sort((b, a) => b.price - a.price);
//     });
// };
