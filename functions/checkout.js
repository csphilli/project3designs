"use strict";
exports.handler = async () => {
    console.log("fun with serverless functions");

    const data = {
        name: "Mario",
        job: "plumber",
        age: 35,
    };

    return {
        status: 200,
        body: JSON.stringify(data),
    };
};