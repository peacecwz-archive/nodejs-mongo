import 'reflect-metadata';
import {injectable, inject} from "inversify";
import {Configuration} from "../configs/configuration-manager";

@injectable()
export class Logger {
    private configuration: Configuration;

    constructor (
        @inject(Configuration) configuration: Configuration
    ) {
        this.configuration = configuration;
    }

    debug(message: string) {
        if (this.configuration.get('DEBUG_LOGGING_ENABLED').boolean) {
            console.log(message);
        }
    }

    info(message: string, args?: any) {
        console.info(`[INFO] Message: ${message}`, args);
    }

    warning(message: string, exception?: any, args?: any) {
        console.warn(`[WARNING] Message: ${message}, Exception: ${exception}`, args);
    }

    error(message: string, exception?: any, args?: any) {
        console.error(`[ERROR] Message: ${message}, Exception: ${exception}`, args);
    }
}
