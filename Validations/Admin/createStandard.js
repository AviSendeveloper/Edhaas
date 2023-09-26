const { body } = require("express-validator");
const Board = require("../../Models/Board");
const { error } = require("winston");

module.exports = [
    body("name", "Name should not be empty")
        .trim()
        .isString()
        .custom(async (board) => {
            const boardCount = await Board.find({ name: board }).count();
            if (boardCount > 0) throw new Error(`${board} already exist`);
            return true;
        }),
];
