const { body } = require("express-validator");
const Board = require("../../../Models/Board");
const Standard = require("../../../Models/Standard");
const Subject = require("../../../Models/Subject");
const Topic = require("../../../Models/Topic");
const AgeGroup = require("../../../Models/AgeGroup");
const DifficultyLevel = require("../../../Models/DifficultyLevel");

module.exports = [
    body("type", "confirm password does not matched").custom(
        (type, { req }) => {
            if (type == "academic") {
                body("boardId").custom((boardId) => {});
            }
            return true;
        }
    ),
];
