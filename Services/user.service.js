const User = require("../Models/User");
const rewardService = require("../Services/reward.service");

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
exports.matchUser = async ({ _id = undefined, email = undefined }, select) => {
    const conditions = {};

    if (_id) conditions._id = _id;
    if (email) conditions.email = email;

    const user = await User.findOne({ ...conditions }).select({ ...select });

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

exports.addParentIdInStudent = async ({ studentId, parentId }) => {
    const response = await User.findByIdAndUpdate(
        { _id: studentId },
        { $push: { parents: { parentId: parentId, joinedAt: new Date() } } }
    );
};

exports.checkParentStudentRelation = async ({ parentId, studentId }) => {
    const studentDetails = await this.matchUser({ _id: studentId });

    if (studentDetails === null || studentDetails.role != "student")
        return { status: false };

    const isParentMatch = studentDetails.parents.find((parent) => {
        return parent.parentId == parentId;
    });
    if (isParentMatch == undefined) return { status: false };

    return {
        status: true,
        studentDetails: studentDetails,
    };
};

exports.getUsedQuestions = async (studentId) => {
    const user = await User.findById(studentId);
    return user.usedQuestions;
};

exports.updateUsedQuestions = async (studentId, questionIds) => {
    try {
        const response = await User.findByIdAndUpdate(
            { _id: studentId },
            { $addToSet: { usedQuestions: { $each: questionIds } } }
        );

        return true;
    } catch (error) {
        return false;
    }
};

exports.assignReward = async ({ studentId, rewardId }) => {
    const rewardDetaails = await rewardService.details({ _id: rewardId });

    const response = await User.findByIdAndUpdate(
        { _id: studentId },
        {
            $push: {
                assignedRewards: {
                    rewardId: rewardId,
                    name: rewardDetaails.name,
                    description: rewardDetaails.description,
                    imageUrl: rewardDetaails.imageUrl,
                    assignedAt: new Date(),
                },
            },
        }
    );

    return;
};

exports.assignedRewardList = async (userId) => {
    const userDetils = await User.findById(userId);
    return userDetils.assignedRewards;
};

exports.assignedRewardDetails = async ({ userId, rewardObjId }) => {
    // rewardObjId is _id of assignedRewards object in users collection
    const userDetils = await User.findById(userId);
    const rewardDetails = userDetils.assignedRewards.find((reward) => {
        return reward._id.toString() === rewardObjId;
    });

    if (!rewardDetails) throw new Error("Reward not found");
    return rewardDetails;
};

exports.useAssignedReward = async ({ userId, rewardObjId }) => {
    // rewardObjId is _id of assignedRewards object in users collection
    const userDetils = await User.findByIdAndUpdate(
        userId,
        {
            $pull: {
                assignedRewards: {
                    _id: rewardObjId,
                },
            },
        },
        { new: true }
    );
    return userDetils.assignedRewards;
};
