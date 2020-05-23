import {Logger} from "../../infrastructure/logger";
import {injectable,inject} from 'inversify';
import RecordSchema, {RecordEntity} from "../entities/record-entity";
import {Aggregate} from "mongoose";

@injectable()
export class RecordRepository {
    private logger: Logger;

    constructor(
        @inject(Logger) logger: Logger
    ) {
        this.logger = logger;
    }

    async filterRecords(startDate: Date, endDate: Date, minCount: number, maxCount: number): Promise<RecordEntity[]> {
        const query = [
            {
                "$project": {
                    "_id": "$_id",
                    "key": "$key",
                    "value": "$value",
                    "createdAt": "$createdAt",
                    "totalCount": {
                        "$sum": "$counts"
                    }
                }
            }, {
                "$match": {
                    "$and": [
                        {totalCount: {$gte: parseInt(minCount.toString()), $lte: parseInt(maxCount.toString())}},
                        {createdAt: {$gte: new Date(startDate), $lte: new Date(endDate)}}
                    ]
                }
            },
            {
                '$sort': {
                    totalCount: 1
                }
            }
        ];

        this.logger.debug(`Query: ${JSON.stringify(query)}`);

        return await RecordSchema.aggregate(query).exec();
    }
}
