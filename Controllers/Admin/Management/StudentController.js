const UserService = require("../../../Services/user.service");
const UserMapService = require("../../../Services/user.map.service");

exports.getList = async (req, res, next) => {
    const students = await UserService.getUsersList({ role: "student" });
    return res.json({
        status: true,
        data: students,
    });
};

exports.getDetails = async (req, res, next) => {
    const studentId = req.params.studentId;
    const details = await UserMapService.getParentMap(studentId);
    return res.json({
        status: true,
        data: details,
    });
};

exports.getEditDetails = async (req, res, next) => {
    const studentId = req.params.studentId;
    const details = await UserService.matchUser(
        { _id: studentId },
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

exports.deleteStudent = async (req, res, next) => {
    const studentId = req.params.studentId;
    const response = await UserService.deleteUser(studentId);

    return res.json({
        status: true,
    });
};
