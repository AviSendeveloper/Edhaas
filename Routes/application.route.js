const Router = require("express").Router();
const ApplicationController = require("../Controllers/ApplicationController");

Router.get("/banner", ApplicationController.getBanner);
Router.get("/get-board", ApplicationController.getBoard);
Router.get("/get-standard", ApplicationController.getStandard);
Router.get("/get-age-group", ApplicationController.getAgeGroup);

module.exports = Router;
