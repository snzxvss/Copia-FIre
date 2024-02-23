import {configs} from "../config";
import moment from "moment";

export default class LudyConsole {
    private appname: string = configs.app_name;

    public info(message: string, type: string = "INFO") {
        let dateTime = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`[${dateTime}] [${type}] ${this.appname}: ${message}`);
    }

    public start(message: string) {
        let dateTime = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.info(`[${dateTime}] [START] ${this.appname}: ${message}`);
    }

    public end(message: string) {
        let dateTime = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.info(`[${dateTime}] [END] ${this.appname}: ${message}`);
    }

    public error(message: string) {
        let dateTime = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.error(`[${dateTime}] [ERROR] ${this.appname}: ${message}`);

    }
}