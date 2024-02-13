const examService = require("../../Services/exam.service");

exports.examList = async (req, res) => {
    const userId = req.user._id;

    const examList = await examService.listForStudent(userId);

    return res.status(200).json({
        status: true,
        data: examList,
    });
};

exports.examDetails = async (req, res) => {
    const examId = req.params.examId;

    const examDetails = await examService.examDetailsForStudent(examId);

    return res.status(200).json({
        status: 200,
        data: examDetails,
    });
};
