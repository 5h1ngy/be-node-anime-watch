// src/controllers/AnimeDetailsController.ts
import { JsonController, Get, QueryParam, Param } from "routing-controllers";
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

  /**
    * Ottiene una lista paginata di dettagli degli anime.
    * @param page Numero di pagina
    * @param limit Numero di elementi per pagina
    * @returns PaginatedResult di AnimeDetailsDto
    */
  @Get("/")
  async getAll(
    @QueryParam("page", { required: false }) page: number = 1,
    @QueryParam("limit", { required: false }) limit: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    const result = await this.animeDetailsService.getAll(page, limit);
    return result;
  }

  /**
 * Ottiene i dettagli di un anime per ID.
 * @param id Identificatore dell'anime
 * @returns AnimeDetailsDto o null se non trovato
 */
  @Get("/:id")
  async getById(@Param("id") id: string): Promise<AnimeDetailsDto | null> {
    const result = await this.animeDetailsService.getById(id);
    return result;
  }

  // Nuovo endpoint per cercare anime per titolo
  @Get("/search")
  async searchByTitle(
    @QueryParam("title") title: string,
    @QueryParam("page", { required: false }) page: number = 1,
    @QueryParam("limit", { required: false }) limit: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    const result = await this.animeDetailsService.searchByTitle(title, page, limit);
    return result;
  }
}
