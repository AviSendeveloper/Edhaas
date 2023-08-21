const Router = require("express").Router();
const mapRoute = require("./map.route");

Router.use("/map", mapRoute);

module.exports = Router;
