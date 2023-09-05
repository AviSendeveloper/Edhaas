const UserService = require("../Services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("../Util/jwt");

const bcryptSalt = 5;

exports.register = async (req, res, next) => {
    const { name, email, password, parents = undefined, role } = req.body;

    const hashPassword = await bcrypt.hash(password, bcryptSalt);

    const response = await UserService.createUser({
        name,
        email,
        password: hashPassword,
        parents,
        role,
        status: 1,
    });

    // create token
    const payload = {
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
    };
    const token = jwt.createToken(payload, 24);

    // delete _id field
    const userObject = response.toObject();
    delete userObject._id;

    return res.status(200).json({
        status: true,
        token: token,
        data: userObject,
        msg: "Register and login successfully",
    });
};

exports.login = async (req, res, next) => {
    const { email, password, role } = req.body;

    const user = await UserService.matchUser({ email });

    if (user.role !== role) {
        return res.status(200).json({
            status: false,
            msg: "You are not uthorized",
        });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return res.status(200).json({
            status: false,
            msg: "Invalid email or password",
        });
    }

    // create token
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const token = jwt.createToken(payload, 24);

    return res.status(200).json({
        status: true,
        token: token,
        userDetails: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            imageUrl: user.imageUrl,
            status: user.status,
        },
        msg: "Login successfully",
    });
};
