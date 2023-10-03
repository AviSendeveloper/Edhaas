const Topic = require("../../Models/Topic");

exports.list = async (req, res) => {
    const topics = await Topic.find({});

    return res.json({
        status: true,
        data: topics,
    });
};

exports.create = async (req, res) => {
    const { name, subjectId } = req.body;

    const topic = await Topic.create({
        name: name,
        subjectId: subjectId,
        userId: req.user._id,
    });

    return res.json({
        status: true,
        data: topic,
    });
};

exports.edit = async (req, res) => {
    const { topicId } = req.params;
    const details = await Topic.findOne({ _id: topicId });

    return res.json({
        status: true,
        data: details,
    });
};

exports.update = async (req, res) => {
    const { topicId, name, subjectId } = req.body;
    const updatedDetails = await Topic.findByIdAndUpdate(
        { _id: topicId },
        { name: name, subjectId: subjectId },
        { new: true }
    );

    return res.json({
        status: true,
        data: updatedDetails,
    });
};

exports.delete = async (req, res) => {
    const { topicId } = req.body;
    await Topic.deleteOne({ _id: topicId });

    return res.json({
        status: true,
    });
};
