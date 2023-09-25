const Board = require("../../Models/Board");

exports.list = async (req, res) => {
    const boards = await Board.find({});

    return res.json({
        status: true,
        data: boards,
    });
};

exports.create = async (req, res) => {
    const { name } = req.body;
    console.log(name);

    const board = await Board.create({
        name: name,
        userId: req.user._id,
    });

    return res.json({
        status: true,
        data: board,
    });
};

exports.edit = async (req, res) => {
    const { boardId } = req.params;
    const details = await Board.findOne({ _id: boardId });

    return res.json({
        status: true,
        data: details,
    });
};

exports.update = async (req, res) => {
    const { boardId, name } = req.body;
    const updatedDetails = await Board.findByIdAndUpdate(
        { _id: boardId },
        { name: name },
        { new: true }
    );

    return res.json({
        status: true,
        data: updatedDetails,
    });
};

exports.delete = async (req, res) => {
    const { boardId } = req.body;
    await Board.deleteOne({ _id: boardId });

    return res.json({
        status: true,
    });
};
