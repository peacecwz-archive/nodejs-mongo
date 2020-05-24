import 'reflect-metadata';
import {inject, injectable} from "inversify";
import {Configuration} from "../configs/configuration-manager";
import Mongoose, {connect, disconnect as mongoDisconnect} from "mongoose";
import {Logger} from "../infrastructure/logger";

@injectable()
export class MongoDbConnector {
    private configuration: Configuration;
    private connection?: Mongoose.Connection;
    private logger: Logger;
    private isDisconnected: boolean = false;

    constructor(
        @inject(Configuration) configuration: Configuration,
        @inject(Logger) logger: Logger
    ) {
        this.configuration = configuration;
        this.logger = logger;
    }

    async disconnect() {
        await mongoDisconnect();
        this.isDisconnected = true;
    }

    async initConnection() {
        if (this.connection || this.isDisconnected || this.isDisconnected == undefined) {
            return;
        }

        const connectionString = this.configuration.get('MONGODB_CONNECTION_STRING').string;

        try {
            const mongoose = await connect(connectionString, {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });

            this.connection = mongoose.connection;

            // TODO (baris.ceviz): Configure recoverable connection
            this.connection.on('disconnected', this.initConnection);
        } catch (e) {
            this.logger.error('Cannot connect to mongodb', e);
        }
    }
}
