const User = require("../Models/User");

exports.send = async (senderId, revicerId) => {
    const result = await User.findOneAndUpdate(
        { _id: revicerId },
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
        .select({ invitation: 1 });
    return lists;
};

exports.acceptRequest = async (userId, senderId) => {
    const response = await User.findOneAndUpdate(
        { _id: userId, "invitation.senderId": senderId },
        { $set: { "invitation.$.status": "accepted" } },
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
