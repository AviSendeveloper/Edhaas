const rewardRouter = require("express").Router();
const rewardController = require("../../Controllers/Student/RewardController");

rewardRouter.get("/list", rewardController.rewardList);
rewardRouter.get("/details/:rewardId", rewardController.rewardDetails);
rewardRouter.get("/use/:rewardId", rewardController.useReward);

module.exports = rewardRouter;
