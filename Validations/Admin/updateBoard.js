const { body } = require("express-validator");
const Board = require("../../Models/Board");
const { error } = require("winston");

module.exports = [
    body("boardId", "board id not found").custom(async (bId) => {
        const isBoardExist = await Board.findOne({ _id: bId });
        if (!isBoardExist) throw new Error("board does not exist");
        return true;
    }),
    body("name", "Name should not be empty").trim().notEmpty(),
];
