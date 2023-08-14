module.exports = (req, res, next) => {
    console.log(req.user.role, typeof req.user.role);
    if (req.user.role !== "admin") {
        return res.status(403).json({
            status: false,
            msg: "Unauthrized access",
        });
    }

    next();
};
