const User = require("../Models/User");

exports.send = async ({ senderId, reciverId }) => {
    const result = await User.findOneAndUpdate(
        { _id: reciverId },
        {
            $push: {
                invitation: {
                    senderId: senderId,
                    requestDate: new Date(),
                    status: "pending",
                },
            },
        }
    );
};

exports.showList = async (userId) => {
    const lists = await User.findOne({ _id: userId })
        .populate("invitation.senderId")
        .select({
            invitation: 1,
        });
    return lists;
};

exports.acceptRequest = async (userId, senderId) => {
    const response = await User.findOneAndUpdate(
        { _id: userId, "invitation.senderId": senderId },
        { $pull: { invitation: { senderId: senderId } } },
        { new: true }
    );
    return response;
};

exports.rejectRequest = async (userId, senderId) => {
    const response = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { invitation: { senderId: senderId } } },
        { new: true }
    );
    return response;
};
