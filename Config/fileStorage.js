const multer = require("multer");

// fileStorage
const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image");
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    },
});
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

const profilePictureUpload = multer({
    storage: profilePictureStorage,
    fileFilter: filterImageFile,
});

module.exports.profilePicture = profilePictureUpload;
