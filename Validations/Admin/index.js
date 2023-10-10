const createBoard = require("./Board/createBoard");
const updateBoard = require("./Board/updateBoard");
const createStandard = require("./Standard/createStandard");
const updateStandard = require("./Standard/updateStandard");
const createSubject = require("./Subject/createSubject");
const updateSubject = require("./Subject/updateSubject");
const createTopic = require("./Topic/createTopic");
const updateTopic = require("./Topic/updateTopic");
const createAgeGroup = require("./AgeGroup/createAgeGroup");
const updateAgeGroup = require("./AgeGroup/updateAgeGroup");

// Question
const createQuestionContent = require("./QuestionContent/createQuestionContent");

module.exports = {
    updateBoard,
    createBoard,
    createStandard,
    updateStandard,
    createSubject,
    updateSubject,
    createTopic,
    updateTopic,
    createAgeGroup,
    updateAgeGroup,

    // question
    createQuestionContent,
};
