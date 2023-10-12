const User = require("../Models/User");
const ResetPassword = require("../Models/ResetPassword");
const bcrypt = require("bcrypt");
const jwt = require("../Util/jwt");
const generateOTP = require("../Util/generateOTP");
const sendMail = require("../Util/sendMail");

const bcryptSalt = 5;

exports.forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Generate otp
        const otp = generateOTP();

        // delete old token from reset password collection
        await ResetPassword.deleteMany({ email: email });

        // insert new one
        await ResetPassword.create({
            email: email,
            token: otp,
            expiredAt: Date.now() + 3600000,
        });

        sendMail({
            toEmail: email,
            subject: "reset password",
            body: `OTP: ${otp}`,
        });

        return res.status(200).json({
            status: true,
            msg: `We send an email to ${email}`,
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            status: false,
            msg: `Unable to send an email to ${email}`,
        });
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, otp, password } = req.body;

        // check otp is valid or not
        const findOtp = await ResetPassword.findOne({
            email: email,
            token: otp,
        });

        if (!findOtp) {
            return res.json({
                status: false,
                msg: "invalid otp",
            });
        }

        if (findOtp.isUsed) {
            return res.json({
                status: false,
                msg: "this otp already used",
            });
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, bcryptSalt);

        // update password
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { password: hashPassword },
            { new: true }
        );

        // update isUsed to true for this token
        await ResetPassword.findOneAndUpdate(
            { email: email },
            { isUsed: true }
        );

        // create token
        const payload = {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        };
        const token = jwt.createToken(payload);

        return res.status(200).json({
            status: true,
            token: token,
            userDetails: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                imageUrl: updatedUser.imageUrl,
                status: updatedUser.status,
            },
            msg: "Passwoed reset and Login successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            status: false,
            msg: "something went wrong",
        });
    }
};
