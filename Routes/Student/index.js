const Router = require("express").Router();
const mapRoute = require("./map.route");
const invitationRoute = require("./invitation.route");
const profileRoute = require("./profile.route");
const examRoute = require("./exam.route");
const rewardRoute = require("./reward.route");

Router.use("/map", mapRoute);
Router.use("/invitation", invitationRoute);
Router.use("/profile", profileRoute);
Router.use("/exam", examRoute);
Router.use("/reward", rewardRoute);

module.exports = Router;
