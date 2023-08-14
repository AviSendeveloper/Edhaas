const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const createToken = (payload, hour) => {
    const expTime = hour * 3600;
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
