const userService = require("../../Services/user.service");

exports.rewardList = async (req, res) => {
    try {
        const userId = req.user._id;
        const assignedRewardList = await userService.assignedRewardList(userId);
        return res.json({
            status: true,
            data: assignedRewardList,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.rewardDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const rewardObjId = req.params.rewardId; // rewardObjId is _id of assignedRewards object in users collection
        const rewardDetails = await userService.assignedRewardDetails({
            userId,
            rewardObjId,
        });
        return res.json({
            status: true,
            data: rewardDetails ? rewardDetails : null,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.useReward = async (req, res) => {
    try {
        const userId = req.user._id;
        const rewardObjId = req.params.rewardId;
        const updatedRewards = await userService.useAssignedReward({
            userId,
            rewardObjId,
        });
        return res.json({
            status: true,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};
