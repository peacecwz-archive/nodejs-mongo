import 'reflect-metadata';
import * as sinon from "sinon";
import {SinonMock, SinonSandbox} from 'sinon';
import {expect} from 'chai';
import {Configuration} from "../../../src/configs/configuration-manager";
import {Server} from "../../../src/infrastructure/server";
import {Application} from "../../../src/infrastructure/application";

describe('[application.ts]', () => {
    const configuration = new Configuration();
    const server = new Server();

    let sandbox: SinonSandbox;

    let configurationMock: SinonMock,
        serverMock: SinonMock,
        application: Application;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        configurationMock = sandbox.mock(configuration);
        serverMock = sandbox.mock(server);

        application = new Application(server);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a new application instance', () => {
        // arrange

        // act
        const application = new Application(server);

        // Assert
        expect(application).to.be.instanceOf(Application);
    });

    it('should start application', () => {
        // arrange
        serverMock.expects('start');
        const spy = sandbox.stub(server.app, 'get');

        // act
        application.start();

        // assert
        expect(spy.calledWith('/readiness', sinon.match.func)).to.eq(true);
        expect(spy.calledWith('/liveness', sinon.match.func)).to.eq(true);
    });

    it('should return 200 from liveness if property is true', () => {
        // arrange
        const scope = {
            liveness: true
        };
        const endSpy = sinon.stub();
        const response = {
            status: sinon.stub().returns({
                end: endSpy
            })
        };

        // act
        application['livenessHandler'].apply(scope, [null, response] as any);

        // assert
        expect(response.status.calledWithExactly(200)).to.eq(true);
        expect(endSpy.calledOnce).to.eq(true);
    });

    it('should return 500 from liveness if property is false', () => {
        // arrange
        const scope = {
            liveness: false
        };
        const endSpy = sinon.stub();
        const response = {
            status: sinon.stub().returns({
                end: endSpy
            })
        };

        // act
        application['livenessHandler'].apply(scope, [null, response] as any);

        // assert
        expect(response.status.calledWithExactly(500)).to.eq(true);
        expect(endSpy.calledOnce).to.eq(true);
    });

    it('should return 200 from readiness if property is true', () => {
        // arrange
        const scope = {
            liveness: true
        };
        const endSpy = sinon.stub();
        const response = {
            status: sinon.stub().returns({
                end: endSpy
            })
        };

        // act
        application['readinessHandler'].apply(scope, [null, response] as any);

        // assert
        expect(response.status.calledWithExactly(200)).to.eq(true);
        expect(endSpy.calledOnce).to.eq(true);
    });

    it('should return 500 from readiness if property is false', () => {
        // arrange
        const scope = {
            liveness: false
        };
        const endSpy = sinon.stub();
        const response = {
            status: sinon.stub().returns({
                end: endSpy
            })
        };

        // act
        application['readinessHandler'].apply(scope, [null, response] as any);

        // assert
        expect(response.status.calledWithExactly(500)).to.eq(true);
        expect(endSpy.calledOnce).to.eq(true);
    });
});
