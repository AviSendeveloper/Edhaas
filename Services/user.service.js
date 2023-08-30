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
exports.matchUser = async (
    { _id = undefined, email = undefined },
    { ...select }
) => {
    const conditions = {};

    if (_id) conditions._id = _id;
    if (email) conditions.email = email;

    const user = await User.findOne({ ...conditions }).select(select);

    return user;
};

exports.updateUser = async (id, details) => {
    const result = await User.findOneAndUpdate(
        { _id: id },
        { ...details },
        { new: true }
    );
    return result;
};

exports.deleteUser = async (_id) => {
    const result = await User.deleteOne({ _id });
    return result;
};

exports.getAllParentIds = async () => {
    const parentIds = await User.find({ role: "parent" }).select({ _id: 1 });
    return parentIds;
};

exports.getUsersList = async ({ role }) => {
    const conditions = {};

    // add all conditions here
    if (role) conditions.role = role;

    const users = await User.find({ ...conditions }).select({
        invitaion: 0,
        password: 0,
    });

    return users;
};
