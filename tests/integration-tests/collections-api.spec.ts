import 'reflect-metadata';
import {app,server} from '../../src';
import request from "supertest";
import {expect} from 'chai';

describe("POST /v1/collections", () => {

    afterAll(async () => {
        server.close();
    });

    it("should return success response", async () => {
        // arrange
        const url = '/v1/collections';
        const body = {
            startDate: '2016-01-26',
            endDate: '2018-02-02',
            minCount: 2700,
            maxCount: 3000
        };

        // act
        const result = await request(app).post(url).send(body);

        //assert
        expect(result.status).to.be.eq(200);
        expect(result.body.code).to.be.eq(0);
        expect(result.body.msg).to.be.eq('Success');
        expect(result.body.records).to.be.not.empty;
    });
});
