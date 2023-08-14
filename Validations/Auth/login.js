const { body } = require("express-validator");
const USerService = require("../../Services/user.service");

module.exports = [
    body("email", "Invalid email type")
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom(async (email) => {
            const response = await USerService.isEmailExist(email);
            if (!response) throw new Error(`${email} not found`);
            return true;
        }),
    body("password", "should be atlease 6 charecter long")
        .trim()
        .isString()
        .isLength({ min: 6 }),
];
