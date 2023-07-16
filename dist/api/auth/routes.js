"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const validate_1 = require("./validate");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/sign-up', (0, validateRequest_1.default)(validate_1.userValidate.userZodSchema), controller_1.AuthController.registerUser);
router.post('/login', (0, validateRequest_1.default)(validate_1.userValidate.userLoginZodSchema), controller_1.AuthController.signUpUser);
router.get('/me', (0, auth_1.default)(), controller_1.AuthController.getUserProfile);
exports.authRoute = router;
