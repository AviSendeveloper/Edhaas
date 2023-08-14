const UserService = require("../Services/user.service");

exports.register = async (req, res, next) => {
    const { name, email, password, parents = undefined, role } = req.body;

    const response = await UserService.createUser({
        name,
        email,
        password,
        parents,
        role,
        status: 1,
    });

    return res.status(200).json({
        status: true,
        data: response,
    });
};
