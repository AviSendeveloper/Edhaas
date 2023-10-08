const Router = require("express").Router();
const forgetResetPasswordController = require("../Controllers/ForgetResetPasswordController");
const validator = require("../Validations/Validator");
const {
    forgetPassword,
    resetPassword,
} = require("../Validations/ForgetResetPassword");

Router.post(
    "/forget-password",
    // forgetPassword,
    // validator,
    forgetResetPasswordController.forgetPassword
);
Router.post(
    "/reset-password",
    resetPassword,
    validator,
    forgetResetPasswordController.resetPassword
);

module.exports = Router;
