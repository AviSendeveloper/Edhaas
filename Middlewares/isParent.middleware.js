module.exports = (req, res, next) => {
    if (req.user.role !== "parent") {
        return res.status(403).json({
            status: false,
            msg: "Unauthrized access",
        });
    }

    next();
};
