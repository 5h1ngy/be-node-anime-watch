import { Service } from "typedi";
import { Op } from "sequelize";
import AnimeDetails from "@/models/AnimeDetails";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";

/**
 * Interface for paginated results.
 */
export interface PaginatedResult<T> {
  occurrences: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Service for managing anime details.
 */
@Service()
export class AnimeDetailsService {
  /**
   * Fetches all anime details with pagination.
   *
   * @param offset The page number (1-based).
   * @param size The number of items per page.
   * @returns Paginated anime details.
   */
  async getAll(offset: number = 1, size: number = 10): Promise<PaginatedResult<AnimeDetailsDto>> {
    const { rows, count: total } = await AnimeDetails.findAndCountAll({
      offset: (offset - 1) * size,
      limit: size,
      include: [
        { association: "asset", required: false },
        { association: "tags", required: false },
        { association: "description", required: false },
      ],
    });

    const occurrences = rows.map(
      (anime) =>
        new AnimeDetailsDto(
          anime.id,
          anime.title || null,
          anime.type || null,
          anime.asset?.id
            ? { id: anime.asset.id, thumbnail: anime.asset.thumbnail }
            : null,
          anime.tags?.map((tag) => ({ id: tag.id, label: tag.label })) || null,
          anime.description?.raw || null
        )
    );

    const totalPages = Math.ceil(total / size);

    return { occurrences, total, page: offset, limit: size, totalPages };
  }

  /**
   * Searches anime by title and returns paginated results.
   *
   * @param title The title to search for.
   * @param offset The page number (1-based).
   * @param size The number of items per page.
   * @returns Paginated anime details matching the title.
   */
  async searchByTitle(title: string, offset: number = 1, size: number = 10): Promise<PaginatedResult<AnimeDetailsDto>> {
    const { rows, count: total } = await AnimeDetails.findAndCountAll({
      where: { title: { [Op.like]: `%${title}%` } },
      offset: (offset - 1) * size,
      limit: size,
      include: [
        { association: "asset", required: false },
        { association: "tags", required: false },
        { association: "description", required: false },
      ],
    });

    const occurrences = rows.map(
      (anime) =>
        new AnimeDetailsDto(
          anime.id,
          anime.title || null,
          anime.type || null,
          anime.asset?.id ? { id: anime.asset.id, thumbnail: anime.asset.thumbnail } : null,
          anime.tags?.map((tag) => ({ id: tag.id, label: tag.label })) || null,
          anime.description?.raw || null
        )
    );

    const totalPages = Math.ceil(total / size);

    return { occurrences, total, page: offset, limit: size, totalPages };
  }
}
