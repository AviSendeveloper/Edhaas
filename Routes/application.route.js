const Router = require("express").Router();
const ApplicationController = require("../Controllers/ApplicationController");

Router.get("/banner", ApplicationController.getBanner);

module.exports = Router;
