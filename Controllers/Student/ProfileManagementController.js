const User = require("../../Models/User");
const updateParentStudentProfile = require("../Module/ParentStudentUpdateProfile");

exports.edit = async (req, res) => {
    const userDetails = await User.findOne({
        _id: req.user._id,
    }).select({
        name: 1,
        imageUrl: 1,
    });

    return res.json({
        status: true,
        data: userDetails,
    });
};

exports.update = async (req, res) => {
    try {
        const { user, body, file } = req;
        const updateUserProfile = await updateParentStudentProfile(
            user,
            body,
            file
        );

        return res.json({
            status: true,
            data: updateUserProfile,
        });
    } catch (error) {
        return res.json({
            status: false,
            data: null,
        });
    }
};
