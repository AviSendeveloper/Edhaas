const { body } = require("express-validator");
const USerService = require("../../Services/user.service");

const roles = ["admin", "creator", "student", "parent"];

module.exports = [
    body("email", "Invalid email type")
        .trim()
        .isEmail()
        .custom(async (email) => {
            const response = await USerService.isEmailExist(email);
            if (!response) throw new Error(`${email} not found`);
            return true;
        }),
    body("password", "password should be atlease 6 charecter long")
        .trim()
        .isString()
        .isLength({ min: 6 }),
    body("role", "Invalid role type").custom((role) => {
        if (!roles.includes(role)) {
            return false;
        }
        return true;
    }),
];
