import { JsonController, Get, QueryParam, Param } from "routing-controllers";
import { Inject, Service } from "typedi";
import { logInfo } from "@/shared/logger";
import { AnimeService } from "@/services/AnimeService";
import { AnimeNewestDto } from "@/dtos/AnimeNewestDto";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";
import { SimpleResultDto, PaginatedResultDto } from "@/dtos/ResultDto";

/**
 * Controller for managing anime details.
 */
@Service()
@JsonController("/anime")
export class AnimeController {
  constructor(
    @Inject()
    private animeService: AnimeService
  ) { }

  /**
   * Fetches all anime details with pagination.
   * 
   * @param offset The pagination offset.
   * @param size The pagination size.
   * @returns Paginated anime details.
   */
  @Get("/newest")
  async getNewest(
    @QueryParam("offset", { required: false }) offset: number = 1,
    @QueryParam("size", { required: false }) size: number = 10
  ): Promise<PaginatedResultDto<AnimeNewestDto>> {
    logInfo(`Fetching all anime details - Offset: ${offset}, Size: ${size}`);
    return await this.animeService.getNewest(offset, size);
  }


  /**
   * Fetches anime details by ID with pagination.
   * 
   * @param id The ID of the anime to fetch.
   * @param offset The pagination offset.
   * @param size The pagination size.
   * @returns Paginated anime details.
   */
  @Get("/details/:id")
  async getDetailsById(
    @Param("id") id: string,
  ): Promise<SimpleResultDto<null | AnimeDetailsDto>> {
    logInfo(`Fetching anime details - ID: ${id}`);
    return await this.animeService.getById(id);
  }
}
