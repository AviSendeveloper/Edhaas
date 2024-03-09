const Notification = require("../Models/Notification");

exports.send = async (userId, body) => {
    try {
        await Notification.create({
            userId: userId,
            body: body,
        });
        return true;
    } catch (error) {
        return false;
    }
};

exports.list = async (userId) => {
    try {
        const list = await Notification.find({ userId });
        return list;
    } catch (error) {
        return false;
    }
};

exports.read = async (notificationId) => {
    try {
        await Notification.findByIdAndUpdate(notificationId, { isRead: true });
        return true;
    } catch (error) {
        return false;
    }
};
