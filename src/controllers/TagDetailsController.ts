import { JsonController, Get, QueryParam } from "routing-controllers";
import { Inject, Service } from "typedi";
import { TagDetailsService } from "@/services/TagDetailsService";
import { PaginatedResult, SimpleResult } from "@/services/TagDetailsService";
import { TagDetailsDto } from "@/dtos/TagDetailsDto";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";
import { logInfo } from "@/shared/logger";

/**
 * Controller for managing tag details.
 */
@Service()
@JsonController("/tag-details")
export class TagDetailsController {
  constructor(
    @Inject()
    private tagDetailsService: TagDetailsService
  ) { }

  /**
   * Fetches all tags.
   * 
   * @returns A list of tag details.
   */
  @Get("/")
  async getAll(): Promise<SimpleResult<TagDetailsDto>> {
    logInfo(`Fetching all tag details`);
    return await this.tagDetailsService.getAll();
  }

  /**
   * Searches tags by label and returns paginated anime details.
   * 
   * @param label The label to search for.
   * @param offset The pagination offset.
   * @param size The pagination size.
   * @returns Paginated anime details associated with the tag.
   */
  @Get("/search")
  async searchByLabel(
    @QueryParam("label") label: string,
    @QueryParam("offset", { required: false }) offset: number = 1,
    @QueryParam("size", { required: false }) size: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    logInfo(`Searching anime by tag label - Label: "${label}"`);
    return await this.tagDetailsService.searchByLabel(label, offset, size);
  }
}
