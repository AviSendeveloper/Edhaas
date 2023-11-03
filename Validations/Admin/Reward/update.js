const { body } = require("express-validator");
const Reward = require("../../../Models/Reward");

module.exports = [
    body("rewardId", "reward id not found").custom(async (bId) => {
        const isRewardExist = await Reward.findOne({ _id: bId });
        if (!isRewardExist) throw new Error("reward does not exist");
        return true;
    }),
    body("name", "Name should not be empty").trim().notEmpty(),
    body("image").custom(function (value, { req }) {
        if (typeof value === string) {
            if (value === "" || value === undefined)
                throw new Error("image file path not found");
        } else {
            const extension = req.file.mimetype.split("/")[1];
            switch (extension) {
                case "jpg":
                    return "jpg";
                case "jpeg":
                    return "jpeg";
                case "png":
                    return "png";
                default:
                    throw new Error(
                        `image should be in jpg, jpeg and png only`
                    );
            }
        }
    }),
];
