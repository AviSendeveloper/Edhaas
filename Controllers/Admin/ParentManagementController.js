const UserService = require("../../Services/user.service");
const UserMapService = require("../../Services/user.map.service");

exports.getList = async (req, res, next) => {
    const parents = await UserService.getUsersList({ role: "parent" });
    return res.json({
        status: true,
        data: parents,
    });
};

exports.getDetails = async (req, res, next) => {
    const parentId = req.params.parentId;
    const details = await UserMapService.getStudentMap(parentId);
    return res.json({
        status: true,
        data: details,
    });
};

exports.getEditDetails = async (req, res, next) => {
    const parentId = req.params.parentId;
    const details = await UserService.matchUser(
        { _id: parentId },
        { invitaion: 0, password: 0 }
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

exports.deleteParent = async (req, res, next) => {
    const parentId = req.params.parentId;
    const response = await UserService.deleteUser(parentId);

    return res.json({
        status: true,
    });
};
