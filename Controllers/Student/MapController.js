const UserMapService = require("../../Services/user.map.service");

exports.getParentsMap = async (req, res, next) => {
    try {
        const { studentId } = req.body;

        if (!studentId)
            return res.json({
                status: false,
                erros: [{ msg: "user not found" }],
            });

        const data = await UserMapService.getParentMap(studentId);

        return res.json({
            status: true,
            data: data,
        });
    } catch (error) {
        const errorResponse = {
            status: false,
            msg: "Something went wrong",
        };

        if (error.name === "BSONError") {
            errorResponse.msg = "Invalid userId";
        }

        return res.json(errorResponse);
    }
};
