const UserService = require("../../Services/user.service");
const UserInvitationService = require("../../Services/user.invitation.service");

exports.send = async (req, res, next) => {
    try {
        const parentEmail = req.body.reciverEmail; // reciver email
        const studentId = req.user._id; // sender id

        // check reciver role
        const parentDetails = await UserService.matchUser({
            email: parentEmail,
        });
        if (!parentDetails) {
            return res.json({
                status: false,
                message: "Requested email not found",
            });
        }
        if (parentDetails.role !== "parent") {
            return res.json({
                status: false,
                message: "You can not send invitation other than a parent",
            });
        }
        // check invitation already send or not
        let responseMessage = "";
        const isIvitationExist = parentDetails.invitation.find((item) => {
            if (item.senderId.toString() === studentId) {
                responseMessage =
                    item.status === "pending"
                        ? "You already send request and it's not accepted yet"
                        : "";
                return true;
            }
            return false;
        });

        const studentDetails = await UserService.matchUser(
            {
                _id: studentId,
            },
            { parents: 1 }
        );

        const isMapExist = studentDetails.parents.find((item) => {
            if (item.parentId.toString() === parentDetails._id) {
                responseMessage = "You already maped";
                return true;
            }
            return false;
        });

        if (isIvitationExist || isMapExist) {
            return res.json({
                status: false,
                message: responseMessage,
            });
        }

        // update student document
        await UserInvitationService.send({
            senderId: studentId,
            reciverId: parentDetails._id,
        });
        responseMessage = "Request send successfully";

        return res.json({
            status: true,
            message: responseMessage,
        });
    } catch (error) {
        console.log(error);
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

        // update sender/student students array
        await UserService.addParentIdInStudent({
            studentId: userId,
            parentId: senderId,
        });

        return res.json({
            status: true,
            message: "request accepted successfully",
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

        const result = await UserInvitationService.rejectRequest(
            userId,
            senderId
        );

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
