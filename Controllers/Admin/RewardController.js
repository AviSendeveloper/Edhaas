const Reward = require("../../Models/Reward");

exports.list = async (req, res) => {
    const rewards = await Reward.find({});

    return res.json({
        status: true,
        data: rewards,
    });
};

exports.create = async (req, res) => {
    const { name } = req.body;
    console.log(name);

    const reward = await Reward.create({
        name: name,
        userId: req.user._id,
    });

    return res.json({
        status: true,
        data: reward,
    });
};

exports.edit = async (req, res) => {
    const { rewardId } = req.params;
    const details = await Reward.findOne({ _id: rewardId });

    return res.json({
        status: true,
        data: details,
    });
};

exports.update = async (req, res) => {
    const { rewardId, name } = req.body;
    const updatedDetails = await Reward.findByIdAndUpdate(
        { _id: rewardId },
        { name: name },
        { new: true }
    );

    return res.json({
        status: true,
        data: updatedDetails,
    });
};

exports.delete = async (req, res) => {
    const { rewardId } = req.body;
    await Reward.deleteOne({ _id: rewardId });

    return res.json({
        status: true,
    });
};
