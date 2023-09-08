const UserMapService = require("../../Services/user.map.service");

exports.getStudentMap = async (req, res, next) => {
    try {
        const { parentId } = req.body;

        const data = await UserMapService.getStudentMap(parentId);

        return res.json({
            status: true,
            data: data[0],
        });
    } catch (error) {
        console.log(error);
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
