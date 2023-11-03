const multer = require("multer");

// fileStorage
const filterImageFile = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// profile picture
const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image");
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    },
});
// reward
const rewardPictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image/reward");
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    },
});

// profile picture
const profilePictureUpload = multer({
    storage: profilePictureStorage,
    fileFilter: filterImageFile,
});

// reward picture
const rewardPictureUpload = multer({
    storage: rewardPictureStorage,
    fileFilter: filterImageFile,
});

module.exports = {
    profilePicture: profilePictureUpload,
    rewardPicture: rewardPictureUpload,
};
