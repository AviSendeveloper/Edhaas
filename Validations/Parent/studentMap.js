const { body } = require("express-validator");

module.exports = [
    body("parentId", "parent Id required")
        .trim()
        .isLength({ min: 24, max: 24 })
        .withMessage("Invalid parent Id"),
];
