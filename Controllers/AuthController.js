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

    return res.status(200).json({
        status: true,
        data: response,
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await UserService.matchUser(email);

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
    const token = jwt.createToken(payload, 30);

    return res.status(200).json({
        status: true,
        token: token,
        msg: "Login successfully",
    });
};
