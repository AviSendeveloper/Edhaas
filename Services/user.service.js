const User = require("../Models/User");
const bcrypt = require("bcrypt");

const bcryptSalt = 5;

/**
 * create new user
 * @param {name: String, email: String, password: String, parents: Array, role: String, status: Boolean} details
 * @returns
 */
exports.createUser = async (details) => {
    console.log(details);
    const hashPassword = await bcrypt.hash(details.password, bcryptSalt);
    const updatedDetails = { ...details, password: hashPassword };
    const user = await User.create({
        ...updatedDetails,
    });

    return user;
};

/**
 * check email exist or not
 * @param {email: String} email
 * @returns
 */
exports.isEmailExist = async (email) => {
    const user = await User.findOne({ email });
    if (user) {
        return true;
    }
    return false;
};
