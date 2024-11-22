import AnimeDetails from "@/models/AnimeDetails";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";
import { Service } from "typedi";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Service()
export class AnimeDetailsService {
  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResult<AnimeDetailsDto>> {
    const offset = (page - 1) * limit;
    const { rows, count: total } = await AnimeDetails.findAndCountAll({
      offset,
      limit,
      include: [{ association: "asset", required: false }],
    });

    const data = rows.map((anime) => new AnimeDetailsDto(anime.id, anime.type || "Unknown", anime.asset?.thumbnail || null));
    const totalPages = Math.ceil(total / limit);

    return { data, total, page, limit, totalPages };
  }

  async getById(id: string): Promise<AnimeDetailsDto | null> {
    const anime = await AnimeDetails.findByPk(id, { include: [{ association: "asset" }] });
    if (!anime) return null;

    return new AnimeDetailsDto(anime.id, anime.type || "Unknown", anime.asset?.thumbnail || null);
  }
}
