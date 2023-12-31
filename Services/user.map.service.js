const User = require("../Models/User");
const { ObjectId } = require("mongodb");

exports.getParentMap = async (studentId) => {
    console.log(studentId);
    try {
        const data = await User.aggregate([
            // stage 1
            // match student
            {
                $match: {
                    _id: new ObjectId(studentId),
                },
            },
            // get all parents by parentsId
            {
                $lookup: {
                    from: "users",
                    localField: "parents.parentId",
                    foreignField: "_id",
                    as: "parentDetails",
                },
            },
            // restructure all the data
            {
                $addFields: {
                    parents: {
                        $map: {
                            input: "$parents",
                            as: "parent",
                            in: {
                                $mergeObjects: [
                                    "$$parent",
                                    {
                                        parentDetails: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$parentDetails",
                                                        as: "detail",
                                                        cond: {
                                                            $eq: [
                                                                "$$detail._id",
                                                                "$$parent.parentId",
                                                            ],
                                                        },
                                                    },
                                                },
                                                0,
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    parentDetails: 0, // Remove the parentDetails array at the top level
                },
            },
        ]);

        return data;
    } catch (error) {
        throw error;
    }
};

exports.getStudentMap = async (parentId) => {
    try {
        const data = await User.aggregate([
            // stage 1
            {
                $match: {
                    _id: new ObjectId(parentId),
                },
            },
            // stage 2
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "parents.parentId",
                    as: "students",
                },
            },
            // stage 3
            {
                $project: {
                    "students.parents": 0,
                },
            },
        ]);

        return data;
    } catch (error) {
        throw error;
    }
};
