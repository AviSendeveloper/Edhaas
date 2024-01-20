const Board = require("../Models/Board");

exports.create = async ({ name, userId }) => {
    const board = await Board.create({ name, userId });
    return board;
};

exports.list = async (userId) => {
    const boards = await Board.find({ userId: userId });
    return boards;
};

exports.allList = async () => {
    const boards = await Board.find({});
    return boards;
};

exports.getDetails = async (boardId) => {
    const board = await Board.findById(boardId);
    return board;
};

exports.update = async ({ boardId, name }) => {
    const updatedDetails = await Board.findByIdAndUpdate(
        { _id: boardId },
        { name: name },
        { new: true }
    );
    return updatedDetails;
};

exports.delete = async (boardId) => {
    await Board.deleteOne({ _id: boardId });
    return true;
};
