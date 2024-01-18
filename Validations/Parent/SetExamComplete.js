const { body } = require("express-validator");
const mongoose = require("mongoose");
const Exam = require("../../Models/Exam");

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
];
