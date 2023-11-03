const Router = require("express").Router();
const RewardController = require("../../Controllers/Admin/RewardController");
const validator = require("../../Validations/Validator");
const { createReward, updateReward } = require("../../Validations/Admin");
const { rewardPicture } = require("../../Config/fileStorage");

Router.get("/list", RewardController.list);
Router.post(
    "/create",
    rewardPicture.single("rewardImage"),
    createReward,
    validator,
    RewardController.create
);
Router.get("/edit/:rewardId", RewardController.edit);
Router.post(
    "/update/:rewardId",
    rewardPicture.single("rewardImage"),
    updateReward,
    validator,
    RewardController.update
);
Router.delete("/delete/:rewardId", RewardController.delete);

module.exports = Router;
