import { JsonController, Get, Param, QueryParam } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";

import { Inject, Service } from "typedi";
import { AssetImagesService } from "@/services/AssetImagesService";
import { PaginatedResult } from "@/services/AssetImagesService";
import { AssetImagesDto } from "@/dtos/AssetImagesDto";

@Service()
@JsonController("/asset-images")
export class AssetImagesController {
    constructor(
        @Inject()
        private assetImagesService: AssetImagesService
    ) { }

    @Get("/")
    @ResponseSchema(AssetImagesDto, { isArray: true })
    async getAll(
        @QueryParam("page", { required: false }) page: number = 1,
        @QueryParam("limit", { required: false }) limit: number = 10
    ): Promise<PaginatedResult<AssetImagesDto>> {
        return this.assetImagesService.getAll(page, limit);
    }

    @Get("/:id")
    @ResponseSchema(AssetImagesDto)
    async getById(@Param("id") id: string): Promise<AssetImagesDto | null> {
        return this.assetImagesService.getById(id);
    }
}
