const { body } = require("express-validator");
const AgeGroup = require("../../../Models/AgeGroup");

module.exports = [
    body("startAge", "start age should be numeric").notEmpty().isNumeric(),
    body("endAge", "end age should be numeric")
        .notEmpty()
        .isNumeric()
        .custom(async (endAge, { req }) => {
            const startAge = req.body.startAge;
            const ageGroupCount = await AgeGroup.find({
                startAge: startAge,
                endAge: endAge,
            }).count();
            if (ageGroupCount > 0)
                throw new Error(`${startAge} and ${endAge} already exist`);
            return true;
        }),
];
