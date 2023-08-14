const { createLogger, transports, format } = require("winston");

const logFormat = format.printf(
    ({ label, level, timestamp, meta, message }) => {
        return `${label || "REQUEST"} ${level} ${timestamp} ${message}`;
    }
);

const routeLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "log/all.log",
        }),
        new transports.File({
            level: "warn",
            filename: "log/warning.log",
        }),
        new transports.File({
            level: "error",
            filename: "log/error.log",
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint(),
        logFormat
    ),
});

const errorLogFormat = format.printf(
    ({ label, level, timestamp, meta, message }) => {
        const stack = meta ? (meta.stack ? `\n stack: ${meta.stack}` : "") : "";
        const req = meta
            ? meta.req
                ? `\n req: ${meta.req.originalUrl}`
                : ""
            : "";
        return `${label} ${level} ${timestamp} ${message} ${req} ${stack}`;
    }
);

const errorLogger = createLogger({
    transports: [
        new transports.File({
            level: "error",
            filename: "log/internalerror.log",
        }),
    ],
    format: format.combine(
        format.label({ label: "[INTERNAL ERROR]" }),
        format.json(),
        format.timestamp(),
        errorLogFormat
    ),
});

module.exports.routeLoger = routeLogger;
module.exports.internalErrorLoger = errorLogger;
