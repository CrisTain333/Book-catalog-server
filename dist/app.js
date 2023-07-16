"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
// import cookieParser from 'cookie-parser';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(cookieParser());
app.use(express_1.default.urlencoded({ extended: true }));
// Entrance
app.use('/api/v1', routes_1.default);
// Global Error handler
app.use(errorHandler_1.default);
// Handle Not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found'
            }
        ]
    });
    next();
});
exports.default = app;
