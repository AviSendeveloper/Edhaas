const AgeGroup = require("../Models/AgeGroup");

exports.create = async ({ name, userId }) => {
    const ageGroup = await AgeGroup.create({ name, userId });
    return ageGroup;
};

exports.list = async (userId) => {
    const ageGroups = await AgeGroup.find({ userId: userId });
    return ageGroups;
};

exports.allList = async () => {
    const ageGroups = await AgeGroup.find({});
    return ageGroups;
};

exports.getDetails = async (ageGroupId) => {
    const ageGroup = await AgeGroup.findById(ageGroupId);
    return ageGroup;
};

exports.update = async ({ ageGroupId, name }) => {
    const updatedDetails = await AgeGroup.findByIdAndUpdate(
        { _id: ageGroupId },
        { name: name },
        { new: true }
    );
    return updatedDetails;
};

exports.delete = async (ageGroupId) => {
    await AgeGroup.deleteOne({ _id: ageGroupId });
    return true;
};
