import { IsString } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

@JSONSchema({
    description: "DTO per TagReferences",
})
export class TagReferencesDto {
    @IsString()
    id!: string;

    @IsString()
    tagId!: string;

    constructor(id: string, tagId: string) {
        this.id = id;
        this.tagId = tagId;
    }
}
