const { body } = require("express-validator");
const UserService = require("../../Services/user.service");
const mongoose = require("mongoose");

const roles = ["admin", "creator", "student", "parent"];

module.exports = [
    body("firstName", "firstname should not be empty")
        .trim()
        .notEmpty()
        .isString(),
    body("email", "Invalid email type")
        .trim()
        .isEmail()
        .toLowerCase()
        .custom(async (email) => {
            const response = await UserService.isEmailExist(email);
            if (response) throw new Error(`${email} already registered`);
            return true;
        }),
    body("password", "password should be atlease 6 charecter long")
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
    body("board").custom((board, { req }) => {
        if (req.body.role === "student" && !mongoose.isValidObjectId(board))
            throw new Error("Invlid boardId");
        return true;
    }),
    body("standard").custom((board, { req }) => {
        if (req.body.role === "student" && !mongoose.isValidObjectId(board))
            throw new Error("Invlid standardId");
        return true;
    }),
    body("ageGroup").custom((board, { req }) => {
        if (req.body.role === "student" && !mongoose.isValidObjectId(board))
            throw new Error("Invlid ageGroupId");
        return true;
    }),
];
