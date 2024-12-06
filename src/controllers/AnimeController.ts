import { JsonController, Get, QueryParam, Param, BodyParam, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { logInfo } from "@/shared/logger";
import { AnimeService } from "@/services/AnimeService";
import { AnimeDto } from "@/dtos/AnimeDto";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";
import { SimpleResultDto, SimpleResultsDto, PaginatedResultDto } from "@/dtos/ResultDto";

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
  @Get("/")
  async getAll(
    @QueryParam("offset", { required: false }) offset: number = 1,
    @QueryParam("size", { required: false }) size: number = 10
  ): Promise<PaginatedResultDto<AnimeDto>> {
    logInfo(`Fetching all anime - Offset: ${offset}, Size: ${size}`);
    return await this.animeService.getAll(offset, size);
  }

  /**
 * Fetches all anime details with pagination.
 * 
 * @param offset The pagination offset.
 * @param size The pagination size.
 * @returns Paginated anime details.
 */
  @Post("/")
  async getAllByIds(
    @BodyParam("ids", { required: true }) ids: string[],
  ): Promise<SimpleResultsDto<AnimeDto[]>> {
    logInfo(`Fetching all anime by ids`);
    return await this.animeService.getByIds(ids);
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
