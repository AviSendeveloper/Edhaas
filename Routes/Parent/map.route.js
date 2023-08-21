const Router = require("express").Router();
const StudentMapController = require("../../Controllers/Parent/MapController");

Router.get("/get-student", StudentMapController.getStudentMap);

module.exports = Router;
