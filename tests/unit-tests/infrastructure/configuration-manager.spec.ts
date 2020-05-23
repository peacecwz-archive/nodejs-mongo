import 'reflect-metadata';
import * as sinon from 'sinon';
import {SinonSandbox} from 'sinon';
import {expect} from 'chai';
import * as faker from 'faker';
import {Configuration} from "../../../src/configs/configuration-manager";

describe('[configuration-manager.ts]', () => {
    let sandbox: SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a new Configuration instance', () => {
        // arrange

        // act
        const configuration = new Configuration();

        // assert
        expect(configuration).to.be.instanceOf(Configuration);
    });

    it('should parse configuration from file if env is not production', () => {
        // arrange
        const config = {
            str: faker.random.word(),
            num: faker.random.number(),
            zero: 0,
            json: '[2,3]'
        };
        sandbox.stub(Configuration.prototype, 'isProduction').returns(false);
        sandbox.stub(Configuration.prototype as any, 'loadFromFile').returns(config);

        // act
        const configuration = new Configuration();

        // assert
        expect(configuration.get('str' as any).string).to.eq(config.str);
        expect(configuration.get('str' as any).boolean).to.eq(true);
        expect(configuration.get('str' as any).number).to.be.NaN;
        expect(configuration.get('str' as any).json).to.eq(null);

        expect(configuration.get('num' as any).string).to.eq(config.num.toString());
        expect(configuration.get('num' as any).boolean).to.eq(true);
        expect(configuration.get('num' as any).number).to.eq(config.num);
        expect(configuration.get('num' as any).json).to.eq(config.num);

        expect(configuration.get('zero' as any).string).to.eq(config.zero.toString());
        expect(configuration.get('zero' as any).boolean).to.eq(false);
        expect(configuration.get('zero' as any).number).to.eq(config.zero);
        expect(configuration.get('zero' as any).json).to.eq(config.zero);

        expect(configuration.get('json' as any).string).to.eq(config.json);
        expect(configuration.get('json' as any).boolean).to.eq(true);
        expect(configuration.get('json' as any).number).to.be.NaN;
        expect(configuration.get('json' as any).json).to.deep.eq([2, 3]);
    });

    it('should parse configuration from env if production', () => {
        // arrange
        const config = {
            str: faker.random.word(),
            num: faker.random.number(),
            zero: 0,
        };
        sandbox.stub(Configuration.prototype, 'isProduction').returns(true);
        sandbox.stub(process, 'env').value(config);

        // act
        const configuration = new Configuration();

        // assert
        expect(configuration.get('str' as any).string).to.eq(config.str);
        expect(configuration.get('str' as any).boolean).to.eq(true);
        expect(configuration.get('str' as any).number).to.be.NaN;

        expect(configuration.get('num' as any).string).to.eq(config.num.toString());
        expect(configuration.get('num' as any).boolean).to.eq(true);
        expect(configuration.get('num' as any).number).to.eq(config.num);

        expect(configuration.get('zero' as any).string).to.eq(config.zero.toString());
        expect(configuration.get('zero' as any).boolean).to.eq(false);
        expect(configuration.get('zero' as any).number).to.eq(config.zero);
    });

    it("should get configs with environment value", () => {
        // arrange
        const configuration = new Configuration();
        process.env.NODE_ENV = 'test';

        // act
        const result = configuration.isProduction();

        // assert
        expect(result).to.eq(false);
    });
});
