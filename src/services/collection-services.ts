import 'reflect-metadata';
import {inject, injectable} from "inversify";
import {CollectionFilterRequest} from "../models/collection-filter-request";
import {BaseResponse} from "../models/base-response";
import {CollectionModel} from "../models/collection-model";
import {RecordRepository} from "../data/repositories/record-repository";
import {ErrorMessage} from "../models/error-message";

@injectable()
export class CollectionServices {

    private recordRepository: RecordRepository;

    constructor(
        @inject(RecordRepository) recordRepository: RecordRepository
    ) {
        this.recordRepository = recordRepository;
    }

    // TODO (baris.ceviz): Refactor validators
    private validate(filterModel: CollectionFilterRequest): BaseResponse<Array<CollectionModel>> {
        let response = new BaseResponse<Array<CollectionModel>>();

        if (!filterModel.minCount && filterModel.minCount != 0) {
            return response.buildError(ErrorMessage.INVALID_COUNT);
        }

        if (!filterModel.maxCount && filterModel.maxCount != 0) {
            return response.buildError(ErrorMessage.INVALID_COUNT);
        }

        if (filterModel.minCount > filterModel.maxCount) {
            return response.buildError(ErrorMessage.INVALID_COUNT_RANGE);
        }

        if (!filterModel.startDate) {
            return response.buildError(ErrorMessage.INVALID_DATE);
        }

        if (!filterModel.endDate) {
            return response.buildError(ErrorMessage.INVALID_DATE);
        }

        if (filterModel.startDate > filterModel.endDate) {
            return response.buildError(ErrorMessage.INVALID_DATE_RANGE);
        }

        return response;
    }

    async filterCollections(filterModel: CollectionFilterRequest): Promise<BaseResponse<Array<CollectionModel>>> {
        const response = this.validate(filterModel);
        if (response?.code) {
            return response;
        }

        let startDate = new Date(filterModel.startDate);
        let endDate = new Date(filterModel.endDate);
        const result = await this.recordRepository
            .filterRecords(startDate, endDate, filterModel.minCount, filterModel.maxCount);

        if (result.length == 0) {
            return response.buildError(ErrorMessage.RECORDS_NOT_FOUND);
        }

        let records = result.map((record: any) => ({
            key: record.key,
            createdAt: record.createdAt,
            totalCount: record.totalCount
        }));

        return response.buildSuccess(records);
    }
}
