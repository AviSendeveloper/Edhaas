const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");
const User = require("../../Models/User");

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
            const oldImageUrl = userDetails.imageUrl;
            if (oldImageUrl !== null && oldImageUrl !== "") {
                const oldFilePath = path.join(__dirname, "../../", oldImageUrl);
                // check file exist or not
                const isFileExist = fsSync.existsSync(oldFilePath);
                if (isFileExist) {
                    await fs.unlink(oldFilePath);
                }
            }

            updateObj.imageUrl = image.path;
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
