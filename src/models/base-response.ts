import {ApiModel, ApiModelProperty, SwaggerDefinitionConstant} from "swagger-express-ts";

@ApiModel({
    description: "Base API Response",
    name: "BaseResponse"
})
export class BaseResponse<T> {
    @ApiModelProperty({
        description: "Response status code",
        required: true,
        type: SwaggerDefinitionConstant.STRING
    })
    code: number;

    @ApiModelProperty({
        description: "Response message",
        required: true,
        type: SwaggerDefinitionConstant.STRING
    })
    msg: string;

    @ApiModelProperty({
        description: "Response generic records",
        required: true,
        type: SwaggerDefinitionConstant.ARRAY
    })
    records: T;

    constructor(props: any) {
        this.code = props.code;
        this.msg = props.msg;
        this.records = props.records;
    }

}
