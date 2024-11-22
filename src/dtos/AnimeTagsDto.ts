import { IsString } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

@JSONSchema({
    description: "DTO per AnimeTags",
})
export class AnimeTagsDto {
    @IsString()
    _uuid!: string;

    @IsString()
    animeDetail!: string;

    @IsString()
    tagDetail!: string;

    constructor(_uuid: string, animeDetail: string, tagDetail: string) {
        this._uuid = _uuid;
        this.animeDetail = animeDetail;
        this.tagDetail = tagDetail;
    }
}
