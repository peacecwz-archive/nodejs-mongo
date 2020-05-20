import 'reflect-metadata';
import {
    controller,
    requestBody,
    response,
    interfaces,
    httpPost
} from 'inversify-express-utils';
import * as express from 'express';
import {
    ApiPath,
    ApiOperationPost
} from 'swagger-express-ts';
import {CollectionFilterRequest} from "../models/collection-filter-request";
import {BaseResponse} from "../models/base-response";
import {CollectionModel} from "../models/collection-model";

@ApiPath({
    path: "/v1/collections",
    name: "Collections"
})
@controller('/v1/collections')
export class CollectionsController implements interfaces.Controller {
    constructor() {
    }

    @ApiOperationPost({
        description: 'Filter collections data',
        parameters: {
            body: {
                description: "Collections filter request",
                required: true,
                model: "CollectionFilterRequest"
            }
        },
        responses: {
            200: {
                description: "Success",
                model: 'BaseResponse'
            },
            400: {description: "Invalid filter parameters"}
        },
        path: '/'
    })
    @httpPost('/')
    async filterCollections(
        @requestBody() req: CollectionFilterRequest,
        @response() response: express.Response
    ) {
        const data = new BaseResponse<Array<CollectionModel>>({
            code: 0,
            msg: 'Success',
            records: [
                {
                    key: 'key-id',
                    createdAt: '2017-01-28T01:22:14.398Z',
                    totalCount: 2500
                }
            ]
        });
        response.status(200).json(data);
    }
}
