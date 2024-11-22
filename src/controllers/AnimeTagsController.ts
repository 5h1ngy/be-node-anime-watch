// src/controllers/AnimeTagsController.ts
import { JsonController, Get, Param } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AnimeTagsService } from "@/services/AnimeTagsService";

@Service()
@JsonController("/anime-tags")
export class AnimeTagsController {
    constructor(
        @Inject()
        private animeTagsService: AnimeTagsService
    ) { }

    @Get("/anime/:animeId")
    async getTagsByAnimeId(@Param("animeId") animeId: string) {
        return await this.animeTagsService.getTagsByAnimeId(animeId);
    }
}
