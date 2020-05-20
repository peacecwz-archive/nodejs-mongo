import 'reflect-metadata';
import {container} from './infrastructure/ioc';
import {Application} from './infrastructure/application';
import {MongoApplicationDemo} from './infrastructure/mongo-application-demo';

const application = container.get<Application>(MongoApplicationDemo);
application.start();

