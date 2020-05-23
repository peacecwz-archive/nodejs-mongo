import {ApiModel, ApiModelProperty, SwaggerDefinitionConstant} from "swagger-express-ts";
import {ErrorMessage} from "./error-message";

@ApiModel({
    description: "Base API Response",
    name: "BaseResponse"
})
export class BaseResponse<T> {
    @ApiModelProperty({
        description: "Response status code",
        required: true,
        type: SwaggerDefinitionConstant.Response.Type.NUMBER
    })
    code!: number;

    @ApiModelProperty({
        description: "Response message",
        required: true,
        type: SwaggerDefinitionConstant.Response.Type.STRING
    })
    msg!: string;

    @ApiModelProperty({
        description: "Response generic records",
        required: false,
        type: SwaggerDefinitionConstant.Response.Type.OBJECT
    })
    records!: T;

    constructor(props?: any) {
        if (!props) {
            return;
        }

        this.code = props.code;
        this.msg = props.msg;
        this.records = props.records;
    }

    buildSuccess(records: T): BaseResponse<T> {
        this.code = 0;
        this.msg = 'Success';
        this.records = records;

        return this;
    }

    buildError(errorMessage: ErrorMessage): BaseResponse<T> {
        this.code = errorMessage;
        this.msg = ErrorMessage[errorMessage];

        return this;
    }
}
