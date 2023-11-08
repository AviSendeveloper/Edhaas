const QuestionContent = require("../Models/QuestionContent");

module.exports = async (req, res, next) => {
    const { questionId } = req.body;
    const user = req.user;

    const questionDetails = await QuestionContent.findOne({ _id: questionId });

    if (
        questionDetails.creatorId.toString() !== user._id.toString() &&
        user.role !== "admin"
    ) {
        return res.status(403).json({
            status: false,
            msg: "Unauthrized to update this question",
        });
    }

    next();
};
