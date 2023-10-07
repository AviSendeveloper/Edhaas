const Router = require("express").Router();
const ProfileManagementController = require("../../Controllers/Parent/ProfileManagementController");
const { profilePicture } = require("../../Config/fileStorage");

Router.get("/edit", ProfileManagementController.edit);
Router.post(
    "/update",
    profilePicture.single("profilePicture"),
    ProfileManagementController.update
);

module.exports = Router;
