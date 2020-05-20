import {Application} from "./application";
import {inject} from "inversify";
import {Server} from "./server";

export class MongoApplicationDemo extends Application {

    constructor(
        @inject(Server) server: Server,
    ) {
        super(server);

        this.liveness = true;
        this.readiness = true;
    }

    async OnBeforeStart() {
    }
}
