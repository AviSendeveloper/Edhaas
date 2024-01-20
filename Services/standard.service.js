const Standard = require("../Models/Standard");

exports.create = async ({ name, userId }) => {
    const standard = await Standard.create({ name, userId });
    return standard;
};

exports.list = async (userId) => {
    const standards = await Standard.find({ userId: userId });
    return standards;
};

exports.allList = async () => {
    const standards = await Standard.find({});
    return standards;
};

exports.getDetails = async (standardId) => {
    const standard = await Standard.findById(standardId);
    return standard;
};

exports.update = async ({ standardId, name }) => {
    const updatedDetails = await Standard.findByIdAndUpdate(
        { _id: standardId },
        { name: name },
        { new: true }
    );
    return updatedDetails;
};

exports.delete = async (standardId) => {
    await Standard.deleteOne({ _id: standardId });
    return true;
};
