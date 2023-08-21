exports.getStudentMap = (req, res, next) => {
    const { parentId } = req.body;
    return res.json({
        status: true,
        data: null,
    });
};
