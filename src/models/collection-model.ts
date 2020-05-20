import {ApiModel, ApiModelProperty, SwaggerDefinitionConstant} from "swagger-express-ts";

@ApiModel({
    description: "Collection model",
    name: "CollectionModel"
})
export class CollectionModel {
    @ApiModelProperty({
        description: "Collection key",
        required: true,
        type: SwaggerDefinitionConstant.STRING
    })
    key: string;

    @ApiModelProperty({
        description: "Collection created date",
        required: true,
        type: SwaggerDefinitionConstant.STRING
    })
    createdAt: string;

    @ApiModelProperty({
        description: "Collection total count",
        required: true,
        type: SwaggerDefinitionConstant.STRING
    })
    totalCount: number;

    constructor(props: any) {
        this.key = props.createdAt;
        this.createdAt = props.createdAt;
        this.totalCount = props.totalCount;
    }

}
