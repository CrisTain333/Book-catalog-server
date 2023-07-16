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
exports.AuthService = exports.getUser = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const User_1 = require("../../model/User");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelper_1 = require("../../helper/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = user;
    //Check the email exist in database or not ;
    const isExits = yield User_1.User.findOne({ email: email });
    if (isExits) {
        throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Email already exists');
    }
    // now create the user;
    const newUser = User_1.User.create({
        name,
        email,
        password
    });
    return newUser;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    const isUserExist = yield User_1.User.findOne({ email: userEmail });
    // check the email exist
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, 'User does not exist');
    }
    // check the password
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    // if not matched throw error;
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    const { name, email } = isUserExist;
    // if matched created
    const accessToken = jwtHelper_1.jwtHelper.createToken({ name, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken
    };
});
const getUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new ApiError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'User not found');
    }
    const { email } = req.user;
    // console.log(req.user);
    const response = yield User_1.User.findOne({ email: email });
    const { _id, name, email: userEmail } = response;
    const data = {
        _id,
        name,
        email: userEmail
    };
    return data;
});
exports.getUser = getUser;
exports.AuthService = {
    createUser,
    login,
    getUser: exports.getUser
};
