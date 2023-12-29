const UserService = require("../../Services/user.service");
const UserInvitationService = require("../../Services/user.invitation.service");

exports.send = async (req, res, next) => {
    const reciverEmail = req.body.reciverEmail;
    const senderId = req.user._id;

    // check reciver role
    const reciverDetails = await UserService.matchUser({ email: reciverEmail });
    if (!reciverDetails) {
        return res.json({
            status: false,
            message: "Requested email not found",
        });
    }
    if (reciverDetails.role === "student") {
        return res.json({
            status: false,
            message: "You can not send invitation to a students",
        });
    }
    // check invitation already send or not
    let responseMessage = "";
    const isExist = reciverDetails.invitation.find((item) => {
        if (item.senderId.toString() === senderId) {
            responseMessage =
                item.status === "accepted" ? "You already maped" : "";
            responseMessage =
                item.status === "pending"
                    ? "You already send request and it's not accepted yet"
                    : "";
            return true;
        }
        return false;
    });

    if (isExist) {
        return res.json({
            status: false,
            message: responseMessage,
        });
    }

    // update student document
    await UserInvitationService.send(senderId, reciverDetails._id);
    responseMessage = "Request send successfully";

    return res.json({
        status: true,
        message: responseMessage,
    });
};

exports.list = async (req, res, next) => {
    const userId = req.user._id;

    const response = await UserInvitationService.showList(userId);

    return res.json({
        status: true,
        data: response.invitation,
    });
};

exports.accept = async (req, res, next) => {
    const { senderId } = req.body;
    const userId = req.user._id;

    const invitaionList = await UserInvitationService.showList(userId);
    console.log("list", invitaionList);

    // check sendId exist or not
    const isExist = invitaionList.invitation.find((invitation) => {
        return invitation.senderId._id.toString() === senderId;
    });

    if (!isExist) {
        return res.json({
            status: false,
            message: "This user is not in invitation request list",
        });
    }

    const result = await UserInvitationService.acceptRequest(userId, senderId);

    // update sender/student students array
    await UserService.addParentIdInStudent({
        studentId: userId,
        parentId: senderId,
    });

    return res.json({
        status: true,
        message: "request accepted successfully",
    });
};

exports.reject = async (req, res, next) => {
    const { senderId } = req.body;
    const userId = req.user._id;

    const invitaionList = await UserInvitationService.showList(userId);

    // check sendId exist or not
    const isExist = invitaionList.invitation.find((invitation) => {
        return invitation.senderId._id.toString() === senderId;
    });

    if (!isExist) {
        return res.json({
            status: false,
            message: "This user is not in invitation request list",
        });
    }

    const result = await UserInvitationService.rejectRequest(userId, senderId);

    return res.json({
        status: true,
        message: "Request rejected successfully",
    });
};
