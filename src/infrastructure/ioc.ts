import {Container} from 'inversify';
import {Configuration} from "../configs/configuration-manager";
import {Server} from "./server";
import {MongoApplicationDemo} from "./mongo-application-demo";
import {RoutingContextManager} from "./routing-context-maanger";
import {interfaces} from "inversify-express-utils";
import {CollectionsController} from "../controllers/collections-controller";
import {CollectionServices} from "../services/collection-services";
import {MongoDbConnector} from "../connectors/mongo-db-connector";
import {Logger} from "./logger";
import {RecordRepository} from "../data/repositories/record-repository";
import {IndexController} from "../controllers/index-controller";

const container = new Container();

//Infrastructure
container.bind<Logger>(Logger).toSelf().inSingletonScope();
container.bind<Configuration>(Configuration).toSelf().inSingletonScope();
container.bind<Server>(Server).toSelf().inSingletonScope();
container.bind<MongoApplicationDemo>(MongoApplicationDemo).toSelf().inSingletonScope();

// Connectors
container.bind<MongoDbConnector>(MongoDbConnector).toSelf().inSingletonScope();

// Repositories
container.bind<RecordRepository>(RecordRepository).toSelf().inSingletonScope();

// Services
container.bind<CollectionServices>(CollectionServices).toSelf().inSingletonScope();

// Controllers
container.bind<interfaces.Controller>(IndexController).toSelf().inSingletonScope().whenTargetNamed(CollectionsController.name);
container.bind<interfaces.Controller>(CollectionsController).toSelf().inSingletonScope().whenTargetNamed(CollectionsController.name);
container.bind<RoutingContextManager>(RoutingContextManager).toSelf().inSingletonScope();

// Add controllers to container
const routingController = container.get<RoutingContextManager>(RoutingContextManager);
routingController.connectServer(container);


export {
    container
}
