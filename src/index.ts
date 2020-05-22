import 'reflect-metadata';
import {container} from './infrastructure/ioc';
import {MongoApplicationDemo} from './infrastructure/mongo-application-demo';

const application = container.get<MongoApplicationDemo>(MongoApplicationDemo);
application.start();

const server = application;

export {
    server
}
