const { body } = require("express-validator");

module.exports = [
    body("studentId", "student Id required")
        .trim()
        .isLength({ min: 24, max: 24 })
        .withMessage("Invalid student Id"),
];
