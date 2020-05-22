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
import {CollectionServices} from "../services/collection-services";
import {inject} from "inversify";
import {validate} from "class-validator";

@ApiPath({
    path: "/v1/collections",
    name: "Collections"
})
@controller('/v1/collections')
export class CollectionsController implements interfaces.Controller {
    private collectionServices: CollectionServices;

    constructor(
        @inject(CollectionServices) collectionServices: CollectionServices
    ) {
        this.collectionServices = collectionServices;
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
        path: '/filter'
    })
    @httpPost('/filter')
    async getCollections(
        @requestBody() req: CollectionFilterRequest,
        @response() response: express.Response
    ) {
        const errors = await validate(req);
        if (errors && errors.length > 0) {
            response.status(400).json(errors);
        }

        const data = await this.collectionServices.filterCollections(req);
        response.status(200).json(data);
    }
}
