const { body } = require("express-validator");
const Standard = require("../../Models/Standard");
const { error } = require("winston");

module.exports = [
    body("standardId", "standard id not found").custom(async (bId) => {
        const isstandardExist = await Standard.findOne({ _id: bId });
        if (!isstandardExist) throw new Error("standard does not exist");
        return true;
    }),
    body("name", "Name should not be empty").trim().notEmpty(),
];
