const Router = require("express").Router();
const mapRoute = require("./map.route");
const invitationRoute = require("./invitation.route");

Router.use("/map", mapRoute);
Router.use("/invitation", invitationRoute);

module.exports = Router;
