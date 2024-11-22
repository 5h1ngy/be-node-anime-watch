// src/controllers/AssetImagesController.ts
import { JsonController, Get, Param, QueryParam } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AssetImagesService } from "@/services/AssetImagesService";

@Service()
@JsonController("/asset-images")
export class AssetImagesController {
    constructor(
        @Inject()
        private assetImagesService: AssetImagesService
    ) { }

    @Get("/")
    async getAll(
        @QueryParam("page", { required: false }) page: number = 1,
        @QueryParam("limit", { required: false }) limit: number = 10
    ) {
        return await this.assetImagesService.getAll(page, limit);
    }

    @Get("/:id")
    async getById(@Param("id") id: string) {
        return await this.assetImagesService.getById(id);
    }
}
