import { JsonController, Get, QueryParam } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AnimeDetailsService } from "@/services/AnimeDetailsService";
import { PaginatedResult } from "@/services/AnimeDetailsService";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";

@Service()
@JsonController("/anime-details")
export class AnimeDetailsController {

  constructor(
    @Inject()
    private animeDetailsService: AnimeDetailsService
  ) { }

  @Get("/")
  async getAll(
    @QueryParam("offset", { required: false }) offset: number = 1,
    @QueryParam("size", { required: false }) size: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    return await this.animeDetailsService.getAll(offset, size);
  }

  @Get("/search")
  async searchByTitle(
    @QueryParam("title") title: string,
    @QueryParam("offset", { required: false }) offset: number = 1,
    @QueryParam("size", { required: false }) size: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    return await this.animeDetailsService.searchByTitle(title, offset, size);
  }
}
