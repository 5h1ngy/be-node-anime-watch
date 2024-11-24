import { JsonController, Get, QueryParam } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AnimeDetailsService } from "@/services/AnimeDetailsService";
import { PaginatedResult } from "@/services/AnimeDetailsService";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";
import { logInfo } from "@/shared/logger";

/**
 * Controller for managing anime details.
 */
@Service()
@JsonController("/anime-details")
export class AnimeDetailsController {
  constructor(
    @Inject()
    private animeDetailsService: AnimeDetailsService
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
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    logInfo(`Fetching all anime details - Offset: ${offset}, Size: ${size}`);
    return await this.animeDetailsService.getAll(offset, size);
  }

  /**
   * Searches anime by title and returns paginated results.
   * 
   * @param title The title to search for.
   * @param offset The pagination offset.
   * @param size The pagination size.
   * @returns Paginated anime details matching the title.
   */
  @Get("/search")
  async searchByTitle(
    @QueryParam("title") title: string,
    @QueryParam("offset", { required: false }) offset: number = 1,
    @QueryParam("size", { required: false }) size: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    logInfo(`Searching anime by title - Title: "${title}", Offset: ${offset}, Size: ${size}`);
    return await this.animeDetailsService.searchByTitle(title, offset, size);
  }
}
