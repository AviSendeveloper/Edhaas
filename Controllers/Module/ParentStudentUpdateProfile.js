const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");
const User = require("../../Models/User");
require("dotenv").config();

/**
 *
 * @param {*} user , user details from request object
 * @param {*} body , request body
 * @param {*} file , uploaded file
 * @returns
 */
module.exports = async (user, body, file) => {
    try {
        const { firstName, lastName, phoneNumber } = body;
        const image = file;
        let updateObj = {};

        const userDetails = await User.findOne({ _id: user._id });

        // delete old file
        if (image) {
            let oldImageUrl = userDetails.imageUrl;
            oldImageUrl = oldImageUrl.replace(process.env.BASE_URL, "");
            if (oldImageUrl !== null && oldImageUrl !== "") {
                const oldFilePath = path.join(
                    __dirname,
                    "../../",
                    "public",
                    oldImageUrl
                );
                // check file exist or not
                const isFileExist = fsSync.existsSync(oldFilePath);
                if (isFileExist) {
                    await fs.unlink(oldFilePath);
                }
            }

            updateObj.imageUrl = "image/" + image.filename;
        }

        updateObj.firstName = firstName;
        updateObj.lastName = lastName;
        updateObj.phoneNumber = phoneNumber;

        const updatedUserDetails = await User.findByIdAndUpdate(
            user._id,
            updateObj,
            { new: true }
        );

        return updatedUserDetails;
    } catch (error) {
        throw error;
    }
};
