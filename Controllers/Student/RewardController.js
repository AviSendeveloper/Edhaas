const Exam = require("../../Models/Exam");
const notificationService = require("../../Services/notification.service");

exports.rewardList = async (req, res) => {
    try {
        const userId = req.user._id;
        const exams = await Exam.find(
            {
                assignTo: userId,
                passStatus: true,
            },
            {
                _id: 1,
                reward: 1,
            }
        ).lean(true);

        const rewardList = exams.map((exam) => {
            return {
                examId: exam._id,
                ...exam.reward,
            };
        });

        return res.json({
            status: true,
            data: rewardList,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.rewardDetails = async (req, res) => {
    try {
        const examId = req.params.examId;
        const rewardDetails = await Exam.findById(examId, {
            reward: 1,
        });

        return res.json({
            status: true,
            data: rewardDetails ? rewardDetails : null,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.useReward = async (req, res) => {
    try {
        const examId = req.params.examId;
        const updatedRewards = await Exam.findByIdAndUpdate(
            examId,
            {
                $set: {
                    "reward.isUsed": true,
                },
            },
            {
                new: true,
            }
        ).populate({
            path: "assignTo",
            select: "firstName lastName",
        });
        console.log(updatedRewards);

        await notificationService.send(
            updatedRewards.creatorId,
            `Reward used by ${updatedRewards.assignTo.firstName} ${updatedRewards.assignTo.lastName}`
        );

        return res.json({
            status: true,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};
