const Router = require("express").Router();
const StandardController = require("../../Controllers/Admin/StandardController");
const validator = require("../../Validations/Validator");
const { createStandard, updateStandard } = require("../../Validations/Admin");

Router.get("/list", StandardController.list);
Router.post("/create", createStandard, validator, StandardController.create);
Router.get("/edit/:standardId", StandardController.edit);
Router.post("/update", updateStandard, validator, StandardController.update);
Router.delete("/delete/:standardId", StandardController.delete);

module.exports = Router;
