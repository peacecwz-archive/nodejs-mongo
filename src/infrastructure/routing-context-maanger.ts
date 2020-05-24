import 'reflect-metadata';
import {Server} from './server';
import {InversifyExpressServer} from 'inversify-express-utils';
import {Container, inject, injectable} from 'inversify';

@injectable()
export class RoutingContextManager {
    private server: Server;

    constructor(
        @inject(Server) server: Server,
    ) {
        this.server = server;
    }

    connectServer(container: Container) {
        const inversifyExpress = new InversifyExpressServer(container, null, null, this.server.app);

        this.server.app = inversifyExpress.build();
    }
}
