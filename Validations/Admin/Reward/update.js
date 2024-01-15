const { body } = require("express-validator");
const rewardService = require("../../../Services/reward.service");

module.exports = [
    body("rewardId", "reward id not found").custom(async (rewardId) => {
        try {
            const isRewardExist = await rewardService.isExist(rewardId);
            if (isRewardExist) {
                return true;
            } else {
                throw new Error("rewardId does not exist");
            }
        } catch (error) {
            throw error;
        }
    }),
    body("name", "Name should not be empty").trim().notEmpty(),
];
