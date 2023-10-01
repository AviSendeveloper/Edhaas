const Subject = require("../../Models/Subject");

exports.list = async (req, res) => {
    const subjects = await Subject.find({});

    return res.json({
        status: true,
        data: subjects,
    });
};

exports.create = async (req, res) => {
    const { name } = req.body;

    const subject = await Subject.create({
        name: name,
        userId: req.user._id,
    });

    return res.json({
        status: true,
        data: subject,
    });
};

exports.edit = async (req, res) => {
    const { subjectId } = req.params;
    const details = await Subject.findOne({ _id: subjectId });

    return res.json({
        status: true,
        data: details,
    });
};

exports.update = async (req, res) => {
    const { subjectId, name } = req.body;
    const updatedDetails = await Subject.findByIdAndUpdate(
        { _id: subjectId },
        { name: name },
        { new: true }
    );

    return res.json({
        status: true,
        data: updatedDetails,
    });
};

exports.delete = async (req, res) => {
    const { subjectId } = req.body;
    await Subject.deleteOne({ _id: subjectId });

    return res.json({
        status: true,
    });
};
