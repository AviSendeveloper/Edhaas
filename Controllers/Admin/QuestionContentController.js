const QuestionContent = require("../../Models/QuestionContent");

exports.create = async (req, res) => {
    return res.json({
        status: true,
        msg: "msg created successfully",
    });
};

exports.edit = (req, res) => {
    return res.json({
        status: true,
        data: null,
    });
};

exports.update = (req, res) => {
    return res.json({
        status: true,
        data: null,
    });
};
