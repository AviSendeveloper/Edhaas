const UserService = require("../../Services/user.service");
const UserInvitationService = require("../../Services/user.invitation.service");

exports.send = async (req, res, next) => {
    const reciverEmail = req.body.reciverEmail;
    const senderId = req.user._id;

    // check reciver role
    const userDetails = await UserService.matchUser({ email: reciverEmail });
    if (!userDetails) {
        return res.json({
            status: false,
            message: "Requested email not found",
        });
    }
    if (userDetails.role === "parent") {
        return res.json({
            status: false,
            message: "You can not send invitation to a parents",
        });
    }
    // check invitation already send or not
    const isExist = userDetails.invitation.find((item) => {
        console.log(item.senderId, senderId);
        return item.senderId.toString() === senderId;
    });

    if (isExist) {
        return res.json({
            status: false,
            message: "Already invitation send to the parents",
        });
    }

    // update student document
    const response = await UserInvitationService.send(
        senderId,
        userDetails._id
    );

    return res.json({
        status: true,
        data: response,
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

    const invitaionList = UserInvitationService.showList(userId);

    // check sendId exist or not
    const isExist = invitaionList.find((invitation) => {
        return invitation.senderId.toString() === senderId;
    });

    if (!isExist) {
        return res.json({
            status: false,
            message: "This user is not in invitation request list",
        });
    }

    const result = await UserInvitationService.acceptRequest(userId, senderId);

    // update sender/student parents array
    const updateResponse = await UserService.addParentIdInStudent(
        senderId,
        userId
    );

    return res.json({
        status: true,
        data: result,
    });
};

exports.reject = async (req, res, next) => {
    const { senderId } = req.body;
    const userId = req.user._id;

    const invitaionList = UserInvitationService.showList(userId);

    // check sendId exist or not
    const isExist = invitaionList.find((invitation) => {
        return invitation.senderId.toString() === senderId;
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
    });
};
