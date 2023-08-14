module.exports = (req, res, next) => {
    if (req.user.role !== "student") {
        return res.status(403).json({
            status: false,
            msg: "Unauthrized access",
        });
    }

    next();
};
