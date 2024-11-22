import { IsString, IsOptional } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

@JSONSchema({
    description: "DTO per TagDetails",
})
export class TagDetailsDto {
    @IsString()
    id!: string;

    @IsString()
    tagReference!: string;

    @IsString()
    label!: string;

    constructor(id: string, tagReference: string, label: string) {
        this.id = id;
        this.tagReference = tagReference;
        this.label = label;
    }
}
