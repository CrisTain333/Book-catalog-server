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
/* eslint-disable no-console */
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const connectToDatabase_1 = require("./database/connectToDatabase");
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
let server;
function fire() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connectToDatabase_1.connectToDatabase)();
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`⚡ Server Fire in http:localhost//${config_1.default.port}`);
        });
        process.on('unhandledRejection', error => {
            if (server) {
                server.close(() => {
                    console.log(error);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
fire();
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});
