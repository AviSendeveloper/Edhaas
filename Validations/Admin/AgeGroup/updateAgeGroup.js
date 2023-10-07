const { body } = require("express-validator");
const AgeGroup = require("../../../Models/AgeGroup");

module.exports = [
    body("startAge", "start age should be numeric").notEmpty().isNumeric(),
    body("endAge", "end age should be numeric").notEmpty().isNumeric(),
];
