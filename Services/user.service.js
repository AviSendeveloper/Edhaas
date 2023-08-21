const User = require("../Models/User");

/**
 * create new user
 * @param {name: String, email: String, password: String, parents: Array, role: String, status: Boolean} details
 * @returns
 */
exports.createUser = async (details) => {
    const user = await User.create(details);

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

/**
 * find user with email
 */
exports.matchUser = async (email) => {
    const user = await User.findOne({ email });

    return user;
};

exports.getAllParents = async () => {
    const parentIds = await User.find({ role: "parent" }).select({ _id: 1 });
    return parentIds;
};
