import 'reflect-metadata';
import {server} from '../../src';
import request from "supertest";
import {expect} from 'chai';
import {ErrorMessage} from "../../src/models/error-message";

describe("POST /v1/collections", () => {
    const app = server.getApp();

    beforeAll(() => {
        // TODO (baris.ceviz): If you would like to use mongoDb with test environment, please mock mongoDbConnector with test mongoDb
    });

    afterAll( async () => {
        await server.close();
    });

    it("should return success response", async () => {
        // arrange
        const url = '/v1/collections/filter';
        const body = {
            startDate: '2016-02-24',
            endDate: '2018-02-26',
            minCount: 100,
            maxCount: 200
        };

        // act
        const result = await request(app).post(url).send(body);

        //assert
        expect(result.status).to.be.eq(200);
        expect(result.body.code).to.be.eq(0);
        expect(result.body.msg).to.be.eq('Success');
        expect(result.body.records).to.be.not.empty;
    });

    it("should return RECORDS_NOT_FOUND message when filter is not matching", async () => {
        // arrange
        const url = '/v1/collections/filter';
        const body = {
            startDate: '1997-01-26',
            endDate: '1997-02-02',
            minCount: 2700,
            maxCount: 3000
        };

        // act
        const result = await request(app).post(url).send(body);

        //assert
        expect(result.body.code).to.be.eq(ErrorMessage.RECORDS_NOT_FOUND);
        expect(result.body.msg).to.be.eq(ErrorMessage[ErrorMessage.RECORDS_NOT_FOUND]);
    });

    it("should return INVALID_COUNT message when min and max count range are missing", async () => {
        // arrange
        const url = '/v1/collections/filter';
        const body = {
            startDate: '1997-01-26',
            endDate: '1997-02-02'
        };

        // act
        const result = await request(app).post(url).send(body);

        //assert
        expect(result.body.code).to.be.eq(ErrorMessage.INVALID_COUNT);
        expect(result.body.msg).to.be.eq(ErrorMessage[ErrorMessage.INVALID_COUNT]);
    });

    it("should return INVALID_COUNT_RANGE message when min and max count range are invalid", async () => {
        // arrange
        const url = '/v1/collections/filter';
        const body = {
            startDate: '1997-01-26',
            endDate: '1997-02-02',
            minCount: 1000,
            maxCount: 0
        };

        // act
        const result = await request(app).post(url).send(body);

        //assert
        expect(result.body.code).to.be.eq(ErrorMessage.INVALID_COUNT_RANGE);
        expect(result.body.msg).to.be.eq(ErrorMessage[ErrorMessage.INVALID_COUNT_RANGE]);
    });

    it("should return INVALID_DATE message when min and max date range are missing", async () => {
        // arrange
        const url = '/v1/collections/filter';
        const body = {
            minCount: 0,
            maxCount: 100
        };

        // act
        const result = await request(app).post(url).send(body);

        //assert
        expect(result.body.code).to.be.eq(ErrorMessage.INVALID_DATE);
        expect(result.body.msg).to.be.eq(ErrorMessage[ErrorMessage.INVALID_DATE]);
    });

    it("should return INVALID_DATE_RANGE message when min and max count range are invalid", async () => {
        // arrange
        const url = '/v1/collections/filter';
        const body = {
            startDate: '2001-01-26',
            endDate: '1997-02-02',
            minCount: 0,
            maxCount: 100
        };

        // act
        const result = await request(app)
            .post(url)
            .send(body);

        //assert
        expect(result.body.code).to.be.eq(ErrorMessage.INVALID_DATE_RANGE);
        expect(result.body.msg).to.be.eq(ErrorMessage[ErrorMessage.INVALID_DATE_RANGE]);
    });
});
