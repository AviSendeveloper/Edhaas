const rewardRouter = require("express").Router();
const rewardController = require("../../Controllers/Student/RewardController");

rewardRouter.get("/list", rewardController.rewardList);
rewardRouter.get("/details/:examId", rewardController.rewardDetails);
rewardRouter.get("/use/:examId", rewardController.useReward);

module.exports = rewardRouter;
