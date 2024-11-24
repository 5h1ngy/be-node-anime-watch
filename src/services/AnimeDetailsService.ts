import { Service } from "typedi";
import { Op } from "sequelize";
import AnimeDetails from "@/models/AnimeDetails";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Service()
export class AnimeDetailsService {

  async getAll(offset: number = 1, size: number = 10): Promise<PaginatedResult<AnimeDetailsDto>> {

    const { rows, count: total } = await AnimeDetails.findAndCountAll({
      offset: (offset - 1) * size, limit: size,
      include: [
        { association: "asset", required: false },
        { association: "tags", required: false },
      ],
    });

    const data = rows.map((anime) => new AnimeDetailsDto(
      anime.id,
      anime.title || null,
      anime.type || null,
      anime.asset?.id ? { id: anime.asset?.id, thumbnail: anime.asset?.thumbnail } : null,
      anime.tags?.map(tag => ({ id: tag.id, label: tag.label })) || null
    ));

    const totalPages = Math.ceil(total / size);

    return { data, total, page: offset, limit: size, totalPages };
  }

  async searchByTitle(title: string, offset: number = 1, size: number = 10): Promise<PaginatedResult<AnimeDetailsDto>> {

    const { rows, count: total } = await AnimeDetails.findAndCountAll({
      where: { title: { [Op.like]: `%${title}%`, } },
      offset: (offset - 1) * size, limit: size,
      include: [
        { association: "asset", required: false },
        { association: "tags", required: false }
      ],
    });

    const data = rows.map((anime) => new AnimeDetailsDto(
      anime.id,
      anime.title || null,
      anime.type || null,
      anime.asset?.id ? { id: anime.asset?.id, thumbnail: anime.asset?.thumbnail } : null,
      anime.tags?.map(tag => ({ id: tag.id, label: tag.label })) || null
    ));

    const totalPages = Math.ceil(total / size);

    return { data, total, page: offset, limit: size, totalPages };
  }
}
