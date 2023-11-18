const UserService = require("../../../Services/user.service");
const UserMapService = require("../../../Services/user.map.service");

exports.getList = async (req, res, next) => {
    const creators = await UserService.getUsersList({ role: "creator" });
    return res.json({
        status: true,
        data: creators,
    });
};

exports.getDetails = async (req, res, next) => {
    const creatorId = req.params.creatorId;
    const details = await UserService.matchUser(
        { _id: creatorId },
        { invitaion: 0, password: 0, parents: 0 }
    );
    return res.json({
        status: true,
        data: details,
    });
};

exports.update = async (req, res, next) => {
    const { id: _id, name, email, status } = req.body;

    const response = await UserService.updateUser(_id, {
        name,
        email,
        status,
    });

    return res.json({
        status: true,
        data: response,
    });
};

exports.deleteCreator = async (req, res, next) => {
    const creatorId = req.params.creatorId;
    const response = await UserService.deleteUser(creatorId);

    return res.json({
        status: true,
    });
};
