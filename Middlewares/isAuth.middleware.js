const jwt = require("../Util/jwt");

module.exports = async (req, res, next) => {
    const response = {
        status: false,
        msg: "Unauthorized access",
    };

    const barerHeader = req.headers["authorization"];
    if (!barerHeader) {
        return res
            .status(403)
            .json({ ...response, msg: "Authorization token missing" });
    }
    const token = barerHeader.split(" ")[1];

    const user = jwt.getUserFromToken(token);

    if (!user) {
        return res.status(403).json({ ...response });
    }

    req.user = user;
    next();
};
