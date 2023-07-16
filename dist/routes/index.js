"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../api/auth/routes");
const routes_2 = require("../api/book/routes");
const router = express_1.default.Router();
router.use('/auth', routes_1.authRoute);
router.use('/books', routes_2.BooksRoutes);
exports.default = router;
