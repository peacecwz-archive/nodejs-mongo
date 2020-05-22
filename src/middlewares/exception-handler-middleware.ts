import * as express from "express";
import {BaseResponse} from "../models/base-response";
import {ErrorMessage} from "../models/error-message";

export function exceptionHandling(err: any, req: express.Request, res: express.Response, next: any) {
    const response = new BaseResponse();
    if (err && err.stack) {
        console.error(err);
        res.status(500)
            .send(response.buildError(ErrorMessage.UNKNOWN_ERROR))
    }
}
