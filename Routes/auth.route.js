const Router = require("express").Router();
const AuthController = require("../Controllers/AuthController");
const validator = require("../Validations/Validator");
const { register } = require("../Validations/Auth");

Router.post("/register", register, validator, AuthController.register);

module.exports = Router;
