// src/services/AnimeDetailsService.ts
import { Service } from "typedi";
import { Op } from "sequelize";
import TagDetails from "@/models/TagDetails";
import AnimeDetails from "@/models/AnimeDetails";
import { TagDetailsDto } from "@/dtos/TagDetailsDto";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";

export interface SimpleResult<T> {
  data: T[];
  total: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Service()
export class TagDetailsService {

  async getAll(): Promise<SimpleResult<TagDetailsDto>> {

    const { rows, count: total } = await TagDetails.findAndCountAll({
      order: [["label", "ASC"]],
    });

    const data = rows.map((tag) => new TagDetailsDto(
      tag.id,
      tag.label || null
    ));

    return { data, total };
  }

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

    const totalAnimes = tags.reduce((sum, tag) => sum + (tag.animes?.length || 0), 0); // Totale degli anime
    const animeOffset = (offset - 1) * size;

    const paginatedAnimes: AnimeDetailsDto[] = [];
    let animeCount = 0;

    // Costruisce gli anime paginati rispettando il limite
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
                details.tags?.map((tag) => ({
                  id: tag.id,
                  label: tag.label,
                })) || null
              )
            );
          }
        }
        animeCount++;
        if (paginatedAnimes.length >= size) break; // Fermati se hai raggiunto il limite
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
