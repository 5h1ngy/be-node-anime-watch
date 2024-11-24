import { JsonController, Get, QueryParam } from "routing-controllers";
import { Inject, Service } from "typedi";
import { TagDetailsService } from "@/services/TagDetailsService";
import { PaginatedResult, SimpleResult } from "@/services/TagDetailsService";
import { TagDetailsDto } from "@/dtos/TagDetailsDto";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";

@Service()
@JsonController("/tag-details")
export class TagDetailsController {

  constructor(
    @Inject()
    private tagDetailsService: TagDetailsService
  ) { }

  @Get("/")
  async getAll(): Promise<SimpleResult<TagDetailsDto>> {
    return await this.tagDetailsService.getAll();
  }

  @Get("/search")
  async searchByLabel(
    @QueryParam("label") label: string,
    @QueryParam("offset", { required: false }) offset: number = 1,
    @QueryParam("size", { required: false }) size: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    return await this.tagDetailsService.searchByLabel(label, offset, size);
  }
}
