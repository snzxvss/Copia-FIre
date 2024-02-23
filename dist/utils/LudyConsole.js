"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const moment_1 = __importDefault(require("moment"));
class LudyConsole {
    constructor() {
        this.appname = config_1.configs.app_name;
    }
    info(message, type = "INFO") {
        let dateTime = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`[${dateTime}] [${type}] ${this.appname}: ${message}`);
    }
    start(message) {
        let dateTime = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.info(`[${dateTime}] [START] ${this.appname}: ${message}`);
    }
    end(message) {
        let dateTime = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.info(`[${dateTime}] [END] ${this.appname}: ${message}`);
    }
    error(message) {
        let dateTime = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.error(`[${dateTime}] [ERROR] ${this.appname}: ${message}`);
    }
}
exports.default = LudyConsole;
//# sourceMappingURL=LudyConsole.js.map