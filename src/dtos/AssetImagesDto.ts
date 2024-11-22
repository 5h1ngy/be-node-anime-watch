import { IsString, IsOptional } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

@JSONSchema({
    description: "DTO per AssetImages",
})
export class AssetImagesDto {
    @IsString()
    id!: string;

    @IsOptional()
    @IsString()
    origin?: string | null;

    @IsOptional()
    @IsString()
    thumbnail?: string | null;

    constructor(id: string, origin: string | null, thumbnail: string | null) {
        this.id = id;
        this.origin = origin;
        this.thumbnail = thumbnail;
    }
}
