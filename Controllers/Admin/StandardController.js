const Standard = require("../../Models/Standard");

exports.list = async (req, res) => {
    const standards = await Standard.find({});

    return res.json({
        status: true,
        data: standards,
    });
};

exports.create = async (req, res) => {
    const { name } = req.body;

    const standard = await Standard.create({
        name: name,
        userId: req.user._id,
    });

    return res.json({
        status: true,
        data: standard,
    });
};

exports.edit = async (req, res) => {
    const { standardId } = req.params;
    const details = await Standard.findOne({ _id: standardId });

    return res.json({
        status: true,
        data: details,
    });
};

exports.update = async (req, res) => {
    const { standardId, name } = req.body;
    const updatedDetails = await Standard.findByIdAndUpdate(
        { _id: standardId },
        { name: name },
        { new: true }
    );

    return res.json({
        status: true,
        data: updatedDetails,
    });
};

exports.delete = async (req, res) => {
    const { standardId } = req.body;
    await Standard.deleteOne({ _id: standardId });

    return res.json({
        status: true,
    });
};
