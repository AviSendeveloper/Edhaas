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
const createReward = require("./Reward/create");
const updateReward = require("./Reward/update");

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
    createReward,
    updateReward,
};
