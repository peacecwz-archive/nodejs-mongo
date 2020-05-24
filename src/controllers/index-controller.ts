import 'reflect-metadata';
import {controller, httpGet,response, interfaces} from "inversify-express-utils";
import * as express from "express";

@controller('/')
export class IndexController implements interfaces.Controller {

    @httpGet('/')
    redirectToSwagger(
        @response() response: express.Response
    ) {
        response.redirect('/api-docs/swagger');
    }
}
