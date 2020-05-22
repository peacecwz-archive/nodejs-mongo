import {injectable} from 'inversify';
import express from 'express';
import * as http from "http";
import bodyParser = require("body-parser");
import * as swagger from "swagger-express-ts";
import {exceptionHandling} from "../middlewares/exception-handler-middleware";

@injectable()
export class Server {
    app: express.Application;
    server: http.Server;

    constructor() {
        this.app = express();
        this.addMiddleware();

        this.server = http.createServer(this.app);
    }

    start() {
        // TODO (peacecwz): Refactor hard coded values
        const port = 80;

        this.server.listen(port, '0.0.0.0', this.onListen.bind(this));
        this.server.setTimeout(10000);
    }

    private onListen() {
        console.log(`Server started listening on 80`);
    }

    private addMiddleware() {
        this.app.use('/api-docs/swagger', express.static('swagger'));
        this.app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.text({ type: 'text/html' }));
        this.app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
        this.app.use(swagger.express(
            {
                definition: {
                    info: {
                        title: "NodeJS MongoDB API",
                        version: "1.0"
                    }
                }
            }
        ));
        this.app.use(exceptionHandling);
    }
}
