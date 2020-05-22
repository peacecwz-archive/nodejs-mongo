import {injectable} from 'inversify';
import {DEV, IConfigSet} from "./config-keys";
// @ts-ignore
import ProcessEnv = NodeJS.ProcessEnv;

class Config {
    string: string;
    number: number;
    boolean: boolean;
    json: any;
    base64Buffer: Buffer;

    constructor(private value: string) {
        this.string = value.toString().trim();
        this.number = this.parseNumber();
        this.base64Buffer = this.parseBuffer();
        this.boolean = this.parseBoolean();
        this.json = this.parseJson();
    }

    private parseNumber() {
        return +this.value;
    }

    private parseBuffer() {
        return new Buffer(this.value.toString(), 'base64');
    }

    private parseBoolean() {
        const numberFormat = +this.value;

        if (!isNaN(numberFormat)) {
            return Boolean(+this.value);
        }

        return !/^\s*(false|0|off)\s*$/.test(this.value);
    }

    private parseJson() {
        let parsedValue = null;

        try {
            parsedValue = JSON.parse(this.value);
        } catch (e) {
            parsedValue = null;
        }

        return parsedValue;
    };
}

@injectable()
class Configuration {
    private config: { [key: string]: Config } = {};

    constructor() {
        this.buildConfig();
    }

    public buildConfig() {
        this.config = this.mapToConfig(!this.isProduction()
            ? this.loadFromFile()
            : this.getEnv());
    }

    get(key: keyof IConfigSet): Config {
        return this.config[key];
    }

    isProduction() {
        return process.env.NODE_ENV === 'production';
    }

    private mapToConfig(obj: { [key: string]: string } | ProcessEnv) {
        return Object.keys(obj)
            .reduce((configList: { [key: string]: Config }, key: string) => {
                return {
                    ...configList,
                    [key]: new Config(obj[key] as string)
                };
            }, {});
    }

    private loadFromFile() {
        // TODO (baris.ceviz): Staging dev and prod

        return {...DEV};
    }

    private getEnv(): any {
        return process.env;
    }
}


export {
    Configuration,
};
