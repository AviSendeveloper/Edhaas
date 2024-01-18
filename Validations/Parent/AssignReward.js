const { body } = require("express-validator");
const mongoose = require("mongoose");
const Exam = require("../../Models/Exam");
const Reward = require("../../Models/Reward");

const checkField = async (model, query) => {
    try {
        const isDataExist = await model.findOne(query);
        if (!isDataExist) return false;
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = [
    body("examId", "Invalid examId")
        .trim()
        .custom(async (examId) => {
            if (
                !mongoose.isValidObjectId(examId) ||
                !(await checkField(Exam, { _id: examId }))
            ) {
                throw new Error("Invalid examId");
            }
            return true;
        }),
    body("rewardId", "Invalid rewardId")
        .trim()
        .custom(async (rewardId) => {
            if (
                !mongoose.isValidObjectId(rewardId) ||
                !(await checkField(Reward, { _id: rewardId }))
            ) {
                throw new Error("Invalid rewardId");
            }
            return true;
        }),
];
