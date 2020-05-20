import {ApiModel, ApiModelProperty, SwaggerDefinitionConstant} from "swagger-express-ts";

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
    startDate: string;

    @ApiModelProperty({
        description: "End date",
        required: true,
        type: SwaggerDefinitionConstant.STRING
    })
    endDate: string;

    @ApiModelProperty({
        description: "Minimum count",
        required: true,
        type: SwaggerDefinitionConstant.NUMBER
    })
    minCount: number;

    @ApiModelProperty({
        description: "Maximum count",
        required: true,
        type: SwaggerDefinitionConstant.NUMBER
    })
    maxCount: number;

    constructor(props: any) {
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.minCount = props.minCount;
        this.maxCount = props.maxCount;
    }

}
