// src/controllers/TagDetailsController.ts
import { JsonController, Get, Param } from "routing-controllers";
import { Inject, Service } from "typedi";
import { TagDetailsService } from "@/services/TagDetailsService";

@Service()
@JsonController("/tag-details")
export class TagDetailsController {
    constructor(
        @Inject()
        private tagDetailsService: TagDetailsService
    ) { }

    @Get("/")
    async getAll() {
        return await this.tagDetailsService.getAll();
    }

    @Get("/:id")
    async getById(@Param("id") id: string) {
        return await this.tagDetailsService.getById(id);
    }
}
