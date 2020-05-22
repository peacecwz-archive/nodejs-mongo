import 'reflect-metadata';
import {ApiModel, ApiModelProperty, SwaggerDefinitionConstant} from "swagger-express-ts";
import {IsDate, IsNumber, IsString} from "class-validator";

@ApiModel({
    description: "Collection filter request model",
    name: "CollectionFilterRequest"
})
export class CollectionFilterRequest {
    @ApiModelProperty({
        description: "Start date",
        required: true,
        type: SwaggerDefinitionConstant.STRING
    })
    @IsDate()
    startDate!: string;

    @ApiModelProperty({
        description: "End date",
        required: true,
        type: SwaggerDefinitionConstant.STRING
    })
    @IsDate()
    endDate!: string;

    @ApiModelProperty({
        description: "Minimum count",
        required: true,
        type: SwaggerDefinitionConstant.NUMBER
    })
    @IsNumber()
    minCount!: number;

    @ApiModelProperty({
        description: "Maximum count",
        required: true,
        type: SwaggerDefinitionConstant.NUMBER
    })
    @IsNumber()
    maxCount!: number;
}
