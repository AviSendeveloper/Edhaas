const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        // const errors = result.errors.reduce((allErrors, error) => {
        //     if (allErrors[error.path]) {
        //         allErrors[error.path].push(error.msg);
        //     } else {
        //         allErrors[error.path] = [error.msg];
        //     }
        //     return allErrors;
        // }, {});

        const errors = result.errors;
        const firstError = errors[0];

        return res.status(203).json({
            status: false,
            msg: firstError.msg,
        });
    }
    next();
};
