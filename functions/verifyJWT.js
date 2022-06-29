const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

exports.handler = async (data) => {
    const body = JSON.parse(data.body);

    const header = data.headers;
    const token = header && header.authorization.split(" ")[1];
    if (token === null) throw new Error(MESSAGES.INVALID_TOKEN);
    jwt.verify(token, process.env.P3D_SIGNATURE_KEY);
};
