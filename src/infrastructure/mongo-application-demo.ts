import {Application} from "./application";
import {inject} from "inversify";
import {Server} from "./server";
import {MongoDbConnector} from "../connectors/mongo-db-connector";

export class MongoApplicationDemo extends Application {
    private mongoDbConnector: MongoDbConnector;

    constructor(
        @inject(Server) server: Server,
        @inject(MongoDbConnector) mongodbConnector: MongoDbConnector
    ) {
        super(server);
        this.mongoDbConnector = mongodbConnector;

        this.liveness = true;
        this.readiness = true;
    }

    async close() {
        await this.mongoDbConnector.disconnect();

        this.server.close();
    }

    async OnBeforeStart() {
        await this.mongoDbConnector.initConnection();
    }
}
