const Router = require("express").Router();
const mapRoute = require("./map.route");
const invitationRoute = require("./invitation.route");
const profileRoute = require("./profile.route");

Router.use("/map", mapRoute);
Router.use("/invitation", invitationRoute);
Router.use("/profile", profileRoute);

module.exports = Router;
