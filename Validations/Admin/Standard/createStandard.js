const { body } = require("express-validator");
const Standard = require("../../../Models/Standard");
const { error } = require("winston");

module.exports = [
    body("name", "Name should not be empty")
        .trim()
        .isString()
        .custom(async (standard) => {
            const standardCount = await Standard.find({
                name: standard,
            }).count();
            if (standardCount > 0) throw new Error(`${standard} already exist`);
            return true;
        }),
];
