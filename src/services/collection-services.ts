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


    async filterCollections(filterModel: CollectionFilterRequest): Promise<BaseResponse<Array<CollectionModel>>> {
        let response = new BaseResponse<Array<CollectionModel>>();

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
