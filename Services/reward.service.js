const Reward = require("../Models/Reward");
const path = require("path");
const {
    routeLoger: logger,
    internalErrorLoger: errorLogger,
} = require("../Config/WinstonLogger");
const fs = require("fs").promises;
const fsSync = require("fs");
require("dotenv").config();

exports.list = async () => {
    try {
        return await Reward.find({});
    } catch (error) {
        throw error;
    }
};

exports.create = async ({ user, body, file }) => {
    try {
        const { name } = body;
        const reward = await Reward.create({
            name: name,
            userId: user._id,
            imageUrl: path.join("image/reward", file.filename),
        });
        return reward;
    } catch (error) {
        throw error;
    }
};

exports.details = async (detailObj) => {
    try {
        return await Reward.findOne(detailObj);
    } catch (error) {
        throw error;
    }
};

exports.update = async ({ user, body, image }) => {
    try {
        const { name, rewardId } = body;
        let updateObj = {};

        const rewardDetails = await Reward.findOne({ _id: rewardId });

        if (rewardDetails.userId.toString() !== user._id.toString()) {
            throw new Error("You are not authorize to update this reward");
        }

        // delete old file
        if (image) {
            const oldImageUrl = rewardDetails.imageUrl.replace(
                process.env.BASE_URL,
                ""
            );
            if (oldImageUrl !== null && oldImageUrl !== "") {
                const oldFilePath = path.join(
                    __dirname,
                    "../",
                    "public",
                    oldImageUrl
                );
                console.log(oldFilePath);
                // check file exist or not
                const isFileExist = fsSync.existsSync(oldFilePath);
                console.log(isFileExist);
                if (isFileExist) {
                    await fs.unlink(oldFilePath);
                }
            }

            updateObj.imageUrl = path.join("image/reward", image.filename);
        }

        updateObj.name = name;

        const updatedRewardDetails = await Reward.findByIdAndUpdate(
            rewardId,
            updateObj,
            { new: true }
        );

        return updatedRewardDetails;
    } catch (error) {
        throw error;
    }
};

exports.delete = async (obj) => {
    try {
        const rewardDetails = await Reward.findOne(obj);
        console.log(rewardDetails);
        const oldImageUrl = rewardDetails.imageUrl.replace(
            process.env.BASE_URL,
            ""
        );
        if (oldImageUrl !== null && oldImageUrl !== "") {
            const oldFilePath = path.join(
                __dirname,
                "../",
                "public",
                oldImageUrl
            );
            // check file exist or not
            const isFileExist = fsSync.existsSync(oldFilePath);
            if (isFileExist) {
                await fs.unlink(oldFilePath);
            }
        }
        await Reward.deleteOne(obj);
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

exports.isExist = async (rewardId) => {
    try {
        const isExist = await Reward.exists({ _id: rewardId });
        return isExist ? true : false;
    } catch (error) {
        return false;
    }
};
