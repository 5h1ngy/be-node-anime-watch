import { JsonController, Get, Param, QueryParam } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";

import { Inject, Service } from "typedi";
import { TagReferencesService } from "@/services/TagReferencesService";
import { PaginatedResult } from "@/services/TagReferencesService";
import { TagReferencesDto } from "@/dtos/TagReferencesDto";

@Service()
@JsonController("/tag-references")
export class TagReferencesController {
    constructor(
        @Inject()
        private tagReferencesService: TagReferencesService
    ) { }

    @Get("/")
    @ResponseSchema(TagReferencesDto, { isArray: true })
    async getAll(
        @QueryParam("page", { required: false }) page: number = 1,
        @QueryParam("limit", { required: false }) limit: number = 10
    ): Promise<PaginatedResult<TagReferencesDto>> {
        return this.tagReferencesService.getAll(page, limit);
    }

    @Get("/:id")
    @ResponseSchema(TagReferencesDto)
    async getById(@Param("id") id: string): Promise<TagReferencesDto | null> {
        return this.tagReferencesService.getById(id);
    }
}
