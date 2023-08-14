const { body } = require("express-validator");
const USerService = require("../../Services/user.service");

const roles = ["admin", "creator", "student", "parent"];

module.exports = [
    body("name", "Shuld not be empty").trim().notEmpty().isString(),
    body("email", "Invalid email type")
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom(async (email) => {
            const response = await USerService.isEmailExist(email);
            if (response) throw new Error(`${email} already registered`);
            return true;
        }),
    body("password", "should be atlease 6 charecter long")
        .trim()
        .isString()
        .isLength({ min: 6 }),
    body("confirm-password", "confirm password does not matched").custom(
        (cPass, { req }) => {
            if (cPass !== req.body.password) {
                return false;
            }
            return true;
        }
    ),
    body("role", "Invalid role type").custom((role) => {
        if (!roles.includes(role)) {
            return false;
        }
        return true;
    }),
];
