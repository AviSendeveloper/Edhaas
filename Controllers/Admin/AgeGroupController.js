const AgeGroup = require("../../Models/AgeGroup");

exports.list = async (req, res) => {
    const ageGroups = await AgeGroup.find({});

    return res.json({
        status: true,
        data: ageGroups,
    });
};

exports.create = async (req, res) => {
    const { startAge, endAge } = req.body;

    const ageGroup = await AgeGroup.create({
        startAge: startAge,
        endAge: endAge,
        userId: req.user._id,
    });

    return res.json({
        status: true,
        data: ageGroup,
    });
};

exports.edit = async (req, res) => {
    const { ageGroupId } = req.params;
    const details = await AgeGroup.findOne({ _id: ageGroupId });

    return res.json({
        status: true,
        data: details,
    });
};

exports.update = async (req, res) => {
    const { ageGroupId, startAge, endAge } = req.body;
    const updatedDetails = await AgeGroup.findByIdAndUpdate(
        { _id: ageGroupId },
        { startAge: startAge, endAge: endAge },
        { new: true }
    );

    return res.json({
        status: true,
        data: updatedDetails,
    });
};

exports.delete = async (req, res) => {
    const { ageGroupId } = req.body;
    await AgeGroup.deleteOne({ _id: ageGroupId });

    return res.json({
        status: true,
    });
};
