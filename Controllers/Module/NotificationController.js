const notificationService = require("../../Services/notification.service");

exports.getNotificationList = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await notificationService.list(userId);
        return res.json({
            status: true,
            data: notifications,
        });
    } catch (error) {
        return res.json({
            status: false,
        });
    }
};

exports.readNotification = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;
        await notificationService.read(notificationId);
        return res.json({
            status: true,
        });
    } catch (error) {
        return res.json({
            status: false,
        });
    }
};
