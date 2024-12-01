import { Service } from "typedi";
import AnimeDetails from "@/models/AnimeDetails";
import { AnimeNewestDto } from "@/dtos/AnimeNewestDto";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";
import { SimpleResultDto, PaginatedResultDto } from "@/dtos/ResultDto";


/**
 * Service for managing anime details.
 */
@Service()
export class AnimeService {
  /**
   * Fetches all anime details with pagination.
   *
   * @param offset The page number (1-based).
   * @param size The number of items per page.
   * @returns Paginated anime details.
   */
  async getNewest(offset: number = 1, size: number = 10): Promise<PaginatedResultDto<AnimeNewestDto>> {

    // Trova righe e conteggio totale dal database
    const { rows, count: total } = await AnimeDetails.findAndCountAll({
      offset: (offset - 1) * size,
      limit: size,
      include: [
        { association: "asset", required: false },
      ],
    });

    // Mappa le righe in un array di DTO
    const occurrences = rows.map((anime) => new AnimeNewestDto(
      anime.id,
      anime.title || null,
      anime.type || null,
      anime.asset?.id
        ? { id: anime.asset.id, thumbnail: anime.asset.thumbnail }
        : null
    ));

    // Calcola il numero totale di pagine
    const totalPages = Math.ceil(total / size);

    // Inizializza e restituisci un'istanza del DTO paginato
    return new PaginatedResultDto<AnimeNewestDto>(occurrences, total, offset, size, totalPages);
  }

  /**
   * Searches anime by title and returns paginated results.
   *
   * @param id The title to search for.
   * @returns Paginated anime details matching the title.
   */
  async getById(id: string): Promise<SimpleResultDto<null | AnimeDetailsDto>> {

    const anime = await AnimeDetails.findByPk(id, {
      include: [
        { association: "asset", required: false },
        { association: "tags", required: false },
        { association: "description", required: false },
      ],
    });

    const occurrence = !anime
      ? null
      : new AnimeDetailsDto(
        anime.id,
        anime.title || null,
        anime.type || null,
        anime.asset?.id ? { id: anime.asset.id, thumbnail: anime.asset.thumbnail } : null,
        anime.tags?.map((tag) => ({ id: tag.id, label: tag.label })) || null,
        anime.description?.raw || null
      )

    return new SimpleResultDto<null | AnimeDetailsDto>(occurrence);
  }
}
