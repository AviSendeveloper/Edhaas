const { body } = require("express-validator");
const mongoose = require("mongoose");
const examTypes = require("../../Models/ExamType");
const difficultyLevels = require("../../Models/DifficultyLevel");
const Subject = require("../../Models/Subject");
const Topic = require("../../Models/Topic");

/*
examType,
difficultyLevel,
studentId,
subjectId,
topicId,
title,
description,
startTime,
duration,
totalQuestionNumber,
cutoffMarks,
*/

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
    body("examType", "Invalid exam type")
        .trim()
        .custom((type) => {
            if (!examTypes.includes(type)) {
                throw new Error("Invalid exam type");
            }
            return true;
        }),
    body("difficultyLevel", "Invalid difficulty level")
        .trim()
        .custom((level) => {
            if (!difficultyLevels.includes(level)) {
                throw new Error("Invalid difficulty level");
            }
            return true;
        }),
    body("studentId", "Invalid studentId")
        .trim()
        .custom((studentId) => {
            if (!mongoose.isValidObjectId(studentId)) {
                throw new Error("Invalid studentId");
            }
            return true;
        }),
    body("subjectId", "Invalid subjectId")
        .trim()
        .custom(async (subjectId) => {
            if (
                !mongoose.isValidObjectId(subjectId) ||
                !(await checkField(Subject, { _id: subjectId }))
            ) {
                throw new Error("Invalid subjectId");
            }
            return true;
        }),
    body("topicId", "Invalid topicId")
        .trim()
        .custom(async (topicId) => {
            if (
                !mongoose.isValidObjectId(topicId) ||
                !(await checkField(Topic, { _id: topicId }))
            ) {
                throw new Error("Invalid topicId");
            }
            return true;
        }),
    body("title", "Invalid title")
        .trim()
        .isLength({ min: 4, max: 255 })
        .withMessage("Invalid title length"),
    body("description", "Invalid description")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Invalid description length"),
    body("startTime", "Invalid startTime")
        .trim()
        .isISO8601()
        .withMessage("Invalid startTime"),
    body("duration", "Invalid duration")
        .trim()
        .isNumeric()
        .withMessage("Invalid duration"),
    body("totalQuestionNumber", "Invalid totalQuestionNumber")
        .trim()
        .isNumeric()
        .withMessage("Invalid totalQuestionNumber"),
    body("cutoffMarks", "Invalid cutoffMarks")
        .trim()
        .isNumeric()
        .withMessage("Invalid cutoffMarks"),
];
