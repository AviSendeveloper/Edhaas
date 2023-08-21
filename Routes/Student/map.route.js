const Router = require("express").Router();
const MapController = require("../../Controllers/Student/MapController");
const validator = require("../../Validations/Validator");
const { parentMap: mapValidation } = require("../../Validations/Student");

Router.get(
    "/get-parents",
    mapValidation,
    validator,
    MapController.getParentsMap
);

module.exports = Router;
