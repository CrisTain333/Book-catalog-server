"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const service_1 = require("./service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const response = yield service_1.AuthService.createUser(user);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: 'User Created Successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const signUpUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const response = yield service_1.AuthService.login(data);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: 'Login Success',
            data: {
                accessToken: response === null || response === void 0 ? void 0 : response.accessToken
            }
        });
    }
    catch (error) {
        next(error);
    }
});
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.AuthService.getUser(req);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: 'User retrieved successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = {
    registerUser,
    signUpUser,
    getUserProfile
};
