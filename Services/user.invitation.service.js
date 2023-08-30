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

exports.accept = async (reciverId, senderId) => {
    const response = await User.findOneAndUpdate(
        { _id: reciverId, "invitation.senderId": senderId },
        { $set: { "invitation.$.status": "approved" } },
        { new: true }
    );
    console.log("accept", response);
    return response;
};

exports.rejectRequest = async (reciverId, senderId) => {
    const response = await User.findOneAndUpdate(
        { _id: reciverId, "invitation.senderId": senderId },
        { $set: { "invitation.$.status": "approved" } },
        { new: true }
    );
    console.log("reject", response);
    return response;
};
