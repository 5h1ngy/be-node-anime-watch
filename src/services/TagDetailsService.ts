import { Service } from "typedi";
import { Op } from "sequelize";
import TagDetails from "@/models/TagDetails";
import AnimeDetails from "@/models/AnimeDetails";
import { TagDetailsDto } from "@/dtos/TagDetailsDto";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";

/**
 * Interface for simple result sets.
 */
export interface SimpleResult<T> {
  data: T[];
  total: number;
}

/**
 * Interface for paginated result sets.
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Service for managing tag details.
 */
@Service()
export class TagDetailsService {
  /**
   * Fetches all tag details in alphabetical order.
   *
   * @returns A list of tag details.
   */
  async getAll(): Promise<SimpleResult<TagDetailsDto>> {
    const { rows, count: total } = await TagDetails.findAndCountAll({
      order: [["label", "ASC"]],
    });

    const data = rows.map((tag) => new TagDetailsDto(tag.id, tag.label || null));

    return { data, total };
  }

  /**
   * Searches tags by label and paginates associated anime details.
   *
   * @param label The label to search for.
   * @param offset The page number (1-based).
   * @param size The number of items per page.
   * @returns Paginated anime details associated with matching tags.
   */
  async searchByLabel(
    label: string,
    offset: number = 1,
    size: number = 10
  ): Promise<PaginatedResult<AnimeDetailsDto>> {
    const tags = await TagDetails.findAll({
      where: { label: { [Op.like]: `%${label}%` } },
      include: [{ association: "animes", required: false }],
      order: [["label", "ASC"]],
    });

    const totalAnimes = tags.reduce((sum, tag) => sum + (tag.animes?.length || 0), 0);
    const animeOffset = (offset - 1) * size;

    const paginatedAnimes: AnimeDetailsDto[] = [];
    let animeCount = 0;

    for (const tag of tags) {
      for (const anime of tag.animes) {
        if (animeCount >= animeOffset && paginatedAnimes.length < size) {
          const details = await AnimeDetails.findByPk(anime.id, {
            include: [
              { association: "asset", required: false },
              { association: "tags", required: false },
            ],
          });

          if (details) {
            paginatedAnimes.push(
              new AnimeDetailsDto(
                details.id,
                details.title || null,
                details.type || null,
                details.asset?.id
                  ? { id: details.asset.id, thumbnail: details.asset.thumbnail }
                  : null,
                details.tags?.map((tag) => ({ id: tag.id, label: tag.label })) || null
              )
            );
          }
        }
        animeCount++;
        if (paginatedAnimes.length >= size) break;
      }
    }

    const totalPages = Math.ceil(totalAnimes / size);

    return {
      data: paginatedAnimes,
      total: totalAnimes,
      page: offset,
      limit: size,
      totalPages,
    };
  }
}
