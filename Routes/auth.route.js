const Router = require("express").Router();
const AuthController = require("../Controllers/AuthController");
const validator = require("../Validations/Validator");
const {
    register: registerValidation,
    login: loginValidation,
} = require("../Validations/Auth");

Router.post(
    "/register",
    registerValidation,
    validator,
    AuthController.register
);
Router.post("/login", loginValidation, validator, AuthController.login);

module.exports = Router;
