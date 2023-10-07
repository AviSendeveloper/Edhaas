const Router = require("express").Router();
const AgeGroupController = require("../../Controllers/Admin/AgeGroupController");
const validator = require("../../Validations/Validator");
const { createAgeGroup, updateAgeGroup } = require("../../Validations/Admin");

Router.get("/list", AgeGroupController.list);
Router.post("/create", createAgeGroup, validator, AgeGroupController.create);
Router.get("/edit/:ageGroupId", AgeGroupController.edit);
Router.post("/update", updateAgeGroup, validator, AgeGroupController.update);
Router.delete("/delete/:ageGroupId", AgeGroupController.delete);

module.exports = Router;
