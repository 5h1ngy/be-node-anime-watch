import { JsonController, Get, Param, QueryParam } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";

import { Inject, Service } from "typedi";
import { TagDetailsService } from "@/services/TagDetailsService";
import { PaginatedResult } from "@/services/TagDetailsService";
import { TagDetailsDto } from "@/dtos/TagDetailsDto";

@Service()
@JsonController("/tag-details")
export class TagDetailsController {
    constructor(
        @Inject()
        private tagDetailsService: TagDetailsService
    ) { }

    @Get("/")
    @ResponseSchema(TagDetailsDto, { isArray: true })
    async getAll(
        @QueryParam("page", { required: false }) page: number = 1,
        @QueryParam("limit", { required: false }) limit: number = 10
    ): Promise<PaginatedResult<TagDetailsDto>> {
        return this.tagDetailsService.getAll(page, limit);
    }

    @Get("/:id")
    @ResponseSchema(TagDetailsDto)
    async getById(@Param("id") id: string): Promise<TagDetailsDto | null> {
        return this.tagDetailsService.getById(id);
    }
}
