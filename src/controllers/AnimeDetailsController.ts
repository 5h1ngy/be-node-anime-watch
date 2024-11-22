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
    @QueryParam("page", { required: false }) page: number = 1,
    @QueryParam("limit", { required: false }) limit: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    const result = await this.animeDetailsService.getAll(page, limit);
    return result;
  }
}
