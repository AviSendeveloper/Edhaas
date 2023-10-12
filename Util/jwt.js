const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const expirationTime = Number(process.env.JWT_TOKEN_EXPIRATION);

const createToken = (payload, hour) => {
    const expTime = hour ? 3600 * hour : expirationTime;
    const token = jwt.sign({ ...payload }, secret, { expiresIn: expTime });

    return token;
};

const getUserFromToken = (token) => {
    let result = "";
    try {
        result = jwt.verify(token, secret);
        return result;
    } catch (error) {
        return false;
    }
};

exports.createToken = createToken;
exports.getUserFromToken = getUserFromToken;
