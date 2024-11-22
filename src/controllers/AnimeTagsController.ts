import { JsonController, Get, Param, QueryParam } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";

import { Inject, Service } from "typedi";
import { AnimeTagsService } from "@/services/AnimeTagsService";
import { PaginatedResult } from "@/services/AnimeTagsService";
import { AnimeTagsDto } from "@/dtos/AnimeTagsDto";

@Service()
@JsonController("/anime-tags")
export class AnimeTagsController {
    constructor(
        @Inject()
        private animeTagsService: AnimeTagsService
    ) { }

    @Get("/")
    @ResponseSchema(AnimeTagsDto, { isArray: true })
    async getAll(
        @QueryParam("page", { required: false }) page: number = 1,
        @QueryParam("limit", { required: false }) limit: number = 10
    ): Promise<PaginatedResult<AnimeTagsDto>> {
        return this.animeTagsService.getAll(page, limit);
    }

    @Get("/:uuid")
    @ResponseSchema(AnimeTagsDto)
    async getById(@Param("uuid") _uuid: string): Promise<AnimeTagsDto | null> {
        return this.animeTagsService.getById(_uuid);
    }
}
