const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
    const dbUri = process.env.DB_URI || "mongodb://localhost:27017/exam";
    return mongoose
        .connect(dbUri)
        .then(() => {
            console.log(`databse connected`);
            return true;
        })
        .catch((error) => {
            console.log("db error: ", error);
            return error;
        });
};
