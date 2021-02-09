const axios = require('axios');
const btoa = require('btoa');

const { NODE_ADDRESS, BASIC_AUTH_CREDENTIALS } = process.env;

const rpc = async (method, params = {}) => {
    const res = await axios({
        url: NODE_ADDRESS,
        headers: {
            "Content-Type": 'application/json-rpc',
            "Authorization": "Basic " + btoa(BASIC_AUTH_CREDENTIALS),
        },
        method: 'POST',
        data: {
            id: 0,
            jsonrpc: "2.0",
            method,
            params
        }
    });
    return res && res.data;
};

module.exports = rpc;
