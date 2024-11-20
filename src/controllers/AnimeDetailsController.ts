import { JsonController, Get, QueryParam, Post, Put, Delete, Param, Body } from "routing-controllers";
import { AnimeDetailsService, PaginatedResult } from "@/services/AnimeDetailsService";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";
import { AnimeDetails } from "@/models/AnimeDetails";

@JsonController("/anime-details")
export class AnimeDetailsController {
  private animeDetailsService = new AnimeDetailsService();

  @Get("/")
  async getAll(
    @QueryParam("page", { required: false }) page: number = 1,
    @QueryParam("limit", { required: false }) limit: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    return this.animeDetailsService.getAll(page, limit);
  }

  @Get("/:id")
  async getById(@Param("id") id: string): Promise<AnimeDetailsDto | null> {
    return this.animeDetailsService.getById(id);
  }

  @Post("/")
  async create(@Body() data: Partial<AnimeDetails>): Promise<AnimeDetails> {
    return this.animeDetailsService.create(data);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: Partial<AnimeDetails>): Promise<AnimeDetails | null> {
    return this.animeDetailsService.update(id, data);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<{ message: string }> {
    await this.animeDetailsService.delete(id);
    return { message: "AnimeDetails deleted successfully" };
  }
}
