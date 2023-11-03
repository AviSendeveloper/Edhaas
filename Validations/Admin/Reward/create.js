const { body } = require("express-validator");
const Reward = require("../../../Models/Reward");

module.exports = [
    body("name", "Name should not be empty")
        .trim()
        .isString()
        .custom(async (reward) => {
            const rewardCount = await Reward.find({ name: reward }).count();
            if (rewardCount > 0) throw new Error(`${reward} already exist`);
            return true;
        }),
    body("image").custom(function (value, { req }) {
        const extension = req.file.mimetype.split("/")[1];
        switch (extension) {
            case "jpg":
                return "jpg";
            case "jpeg":
                return "jpeg";
            case "png":
                return "png";
            default:
                throw new Error(`image should be in jpg, jpeg and png only`);
        }
    }),
];
