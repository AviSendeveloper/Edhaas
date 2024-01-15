const rewardService = require("../../Services/reward.service");

exports.list = async (req, res) => {
    try {
        const rewards = await rewardService.list();

        return res.json({
            status: true,
            data: rewards,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { user, body, file } = req;

        const reward = await rewardService.create({
            user,
            body,
            file,
        });

        return res.json({
            status: true,
            message: "Reward created successfully",
            data: reward,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.getDetails = async (req, res) => {
    try {
        const { rewardId } = req.params;
        const details = await rewardService.details({ _id: rewardId });

        return res.json({
            status: true,
            data: details,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { user, body, file } = req;

        const reward = await rewardService.update({
            user,
            body,
            image: file,
        });

        return res.json({
            status: true,
            message: "Reward updated successfully",
            data: reward,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { rewardId } = req.params;
        await rewardService.delete({ _id: rewardId });

        return res.json({
            status: true,
            message: "Reward deleted successfully",
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};
