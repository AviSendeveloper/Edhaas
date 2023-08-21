const Router = require("express").Router();
const MapController = require("../../Controllers/Parent/MapController");
const validator = require("../../Validations/Validator");
const { studentMap: mapValidation } = require("../../Validations/Parent");

Router.get(
    "/get-students",
    mapValidation,
    validator,
    MapController.getStudentMap
);

module.exports = Router;
