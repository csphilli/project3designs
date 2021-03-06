const jwt = require("jsonwebtoken");

exports.handler = async () => {
    try {
        const token = jwt.sign(
            { name: "Project3 Designs Webform" },
            process.env.P3D_AUTH_TOKEN
        );
        if (!token) {
            throw new Error("Failed to generate token");
        }
        return {
            statusCode: 200,
            body: JSON.stringify(`${token}`),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(`${error}`),
        };
    }
};
