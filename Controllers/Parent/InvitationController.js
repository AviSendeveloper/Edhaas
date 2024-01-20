const UserService = require("../../Services/user.service");
const UserInvitationService = require("../../Services/user.invitation.service");

exports.send = async (req, res, next) => {
    try {
        const studentEmail = req.body.reciverEmail; // reciver email
        const parentId = req.user._id; // sender id

        // check reciver role
        const studentDetails = await UserService.matchUser({
            email: studentEmail,
        });
        if (!studentDetails) {
            return res.json({
                status: false,
                message: "Requested email not found",
            });
        }
        if (studentDetails.role !== "student") {
            return res.json({
                status: false,
                message: "You can not send invitation other than student",
            });
        }
        // check invitation already send or not
        let responseMessage = "";
        const isInvitationExist = studentDetails.invitation.find((item) => {
            if (item.senderId.toString() === parentId) {
                responseMessage =
                    item.status === "pending"
                        ? "You already send request and it's not accepted yet"
                        : "";
                return true;
            }
            return false;
        });

        const isMapExist = studentDetails.parents.find((item) => {
            if (item.parentId.toString() === parentId) {
                responseMessage = "You already maped";
                return true;
            }
            return false;
        });

        if (isInvitationExist || isMapExist) {
            return res.json({
                status: false,
                message: responseMessage,
            });
        }

        // update student document
        await UserInvitationService.send({
            senderId: parentId,
            reciverId: studentDetails._id,
        });
        responseMessage = "Request send successfully";

        return res.json({
            status: true,
            message: responseMessage,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.list = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const response = await UserInvitationService.showList(userId);

        return res.json({
            status: true,
            data: response.invitation,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.accept = async (req, res, next) => {
    try {
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

        const result = await UserInvitationService.acceptRequest(
            userId,
            senderId
        );

        // update sender/student parents array
        await UserService.addParentIdInStudent({
            studentId: senderId,
            parentId: userId,
        });

        return res.json({
            status: true,
            data: result,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};

exports.reject = async (req, res, next) => {
    try {
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

        await UserInvitationService.rejectRequest(userId, senderId);

        return res.json({
            status: true,
            message: "Request rejected successfully",
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
};
