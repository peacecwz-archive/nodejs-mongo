import 'reflect-metadata';
import * as sinon from "sinon";
import {SinonMock, SinonSandbox} from "sinon";
import {expect} from "chai";
import {CollectionFilterRequest} from "../../../src/models/collection-filter-request";
import {CollectionServices} from "../../../src/services/collection-services";
import {RecordRepository} from "../../../src/data/repositories/record-repository";
import {Logger} from "../../../src/infrastructure/logger";
import {Configuration} from "../../../src/configs/configuration-manager";
import {ErrorMessage} from "../../../src/models/error-message";

describe('[collection-services.spec.ts]', () => {
    let sandbox: SinonSandbox,
     collectionServices: CollectionServices,
     recordRepository: RecordRepository,
     recordRepositoryMock: SinonMock;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        recordRepository = new RecordRepository(new Logger(new Configuration()));
        recordRepositoryMock = sandbox.mock(recordRepository);
        collectionServices = new CollectionServices(recordRepository);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return records', async () => {
        // arrange
        const date = new Date();
        const filterModel: CollectionFilterRequest = {
            startDate: date,
            endDate: date,
            minCount: 0,
            maxCount: 100
        };
        const entity = {
            key: 'key',
            value: 'value',
            createdAt: date,
            counts: [10,20,30]
        };

        recordRepositoryMock.expects('filterRecords')
            .withExactArgs(filterModel.startDate, filterModel.endDate,
                filterModel.minCount,filterModel.maxCount)
            .resolves([entity]);

        // act
        const result = await collectionServices.filterCollections(filterModel);

        // assert
        expect(result.code).to.be.eq(0);
        expect(result.msg).to.be.eq('Success');
        expect(result.records).to.be.not.empty;
    });

    it('should return RECORDS_NOT_FOUND error', async () => {
        // arrange
        const date = new Date();
        const filterModel: CollectionFilterRequest = {
            startDate: date,
            endDate: date,
            minCount: 0,
            maxCount: 100
        };

        recordRepositoryMock.expects('filterRecords')
            .withExactArgs(filterModel.startDate, filterModel.endDate,
                filterModel.minCount,filterModel.maxCount)
            .resolves([]);

        // act
        const result = await collectionServices.filterCollections(filterModel);

        // assert
        expect(result.code).to.be.eq(ErrorMessage.RECORDS_NOT_FOUND);
        expect(result.msg).to.be.eq(ErrorMessage[ErrorMessage.RECORDS_NOT_FOUND]);
    });

    it('should return INVALID_COUNT error', async () => {
        // arrange
        const date = new Date();
        const filterModel = new CollectionFilterRequest();
        filterModel.startDate = date;
        filterModel.endDate = date;

        // act
        const result = await collectionServices.filterCollections(filterModel);

        // assert
        expect(result.code).to.be.eq(ErrorMessage.INVALID_COUNT);
        expect(result.msg).to.be.eq(ErrorMessage[ErrorMessage.INVALID_COUNT]);
    });

    it('should return INVALID_COUNT_RANGE error', async () => {
        // arrange
        const date = new Date();
        const filterModel = new CollectionFilterRequest();
        filterModel.startDate = date;
        filterModel.endDate = date;
        filterModel.minCount = 100;
        filterModel.maxCount = 0;

        // act
        const result = await collectionServices.filterCollections(filterModel);

        // assert
        expect(result.code).to.be.eq(ErrorMessage.INVALID_COUNT_RANGE);
        expect(result.msg).to.be.eq(ErrorMessage[ErrorMessage.INVALID_COUNT_RANGE]);
    });

    it('should return INVALID_DATE error', async () => {
        // arrange
        const filterModel = new CollectionFilterRequest();
        filterModel.minCount = 0;
        filterModel.maxCount = 100;

        // act
        const result = await collectionServices.filterCollections(filterModel);

        // assert
        expect(result.code).to.be.eq(ErrorMessage.INVALID_DATE);
        expect(result.msg).to.be.eq(ErrorMessage[ErrorMessage.INVALID_DATE]);
    });

    it('should return INVALID_DATE_RANGE error', async () => {
        // arrange
        const filterModel = new CollectionFilterRequest();
        filterModel.startDate = new Date('2020-02-24');
        filterModel.endDate = new Date('2020-02-22');
        filterModel.maxCount = 100;
        filterModel.minCount = 0;

        // act
        const result = await collectionServices.filterCollections(filterModel);

        // assert
        expect(result.code).to.be.eq(ErrorMessage.INVALID_DATE_RANGE);
        expect(result.msg).to.be.eq(ErrorMessage[ErrorMessage.INVALID_DATE_RANGE]);
    });
});
