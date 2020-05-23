import 'reflect-metadata';
import * as sinon from "sinon";
import { SinonSandbox } from 'sinon';
import { expect } from 'chai';
import { Container } from "inversify";
import {Server} from "../../../src/infrastructure/server";
import {Configuration} from "../../../src/configs/configuration-manager";
import {RoutingContextManager} from "../../../src/infrastructure/routing-context-maanger";
import {Logger} from "../../../src/infrastructure/logger";
import {MongoApplicationDemo} from "../../../src/infrastructure/mongo-application-demo";
import {MongoDbConnector} from "../../../src/connectors/mongo-db-connector";
import {RecordRepository} from "../../../src/data/repositories/record-repository";
import {CollectionServices} from "../../../src/services/collection-services";
import {IndexController} from "../../../src/controllers/index-controller";
import {CollectionsController} from "../../../src/controllers/collections-controller";

describe('[ioc.ts]', () => {
    let sandbox: SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
        Object.keys(require.cache).forEach(function (key) { delete require.cache[key] })
    });

    it('should register all dependencies in develop mode', () => {
        // arrange
        const stub = sandbox.spy(Container.prototype, 'bind');

        // act
        require('../../../src/infrastructure/ioc');

        // assert
        expect(stub.calledWithExactly(Logger)).to.eq(true);
        expect(stub.calledWithExactly(Server)).to.eq(true);
        expect(stub.calledWithExactly(Configuration)).to.eq(true);
        expect(stub.calledWithExactly(MongoApplicationDemo)).to.eq(true);
        expect(stub.calledWithExactly(MongoDbConnector)).to.eq(true);
        expect(stub.calledWithExactly(RecordRepository)).to.eq(true);
        expect(stub.calledWithExactly(CollectionServices)).to.eq(true);
        expect(stub.calledWithExactly(IndexController)).to.eq(true);
        expect(stub.calledWithExactly(CollectionsController)).to.eq(true);
        expect(stub.calledWithExactly(RoutingContextManager)).to.eq(true);
    });
});
