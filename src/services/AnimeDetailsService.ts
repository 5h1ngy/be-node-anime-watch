import { AnimeDetails } from "@/models";
import { AnimeDetailsDto } from "@/dtos/AnimeDetailsDto";
import { logInfo } from "@/utils/logger";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class AnimeDetailsService {
  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResult<AnimeDetailsDto>> {
    const offset = (page - 1) * limit;

    // Ottieni i dati con paginazione e includi le associazioni
    const { rows, count: total } = await AnimeDetails.findAndCountAll({
      offset,
      limit,
      include: [
        {
          association: "assetImage", // Nome dell'associazione definito con `as`
        },
      ],
    });

    // Mappare i dati al DTO
    const data: AnimeDetailsDto[] = rows.map((anime) => {
      return new AnimeDetailsDto(
        anime.id,
        anime.type || "Unknown",
        anime.assetImage?.base64 || '',
        // ''  // Accesso ai dati associati
      );
    });

    const totalPages = Math.ceil(total / limit);

    return { data, total, page, limit, totalPages };
  }

  async getById(id: string): Promise<AnimeDetailsDto | null> {
    const anime = await AnimeDetails.findByPk(id);
    if (!anime) return null;

    // Mappa il singolo risultato al DTO
    return new AnimeDetailsDto(anime.id, anime.type || "Unknown", '');
  }

  async create(data: Partial<AnimeDetails>): Promise<AnimeDetails> {
    return AnimeDetails.create(data);
  }

  async update(id: string, data: Partial<AnimeDetails>): Promise<AnimeDetails | null> {
    const animeDetails = await AnimeDetails.findByPk(id);
    if (!animeDetails) {
      throw new Error("AnimeDetails not found");
    }
    return animeDetails.update(data);
  }

  async delete(id: string): Promise<void> {
    const animeDetails = await AnimeDetails.findByPk(id);
    if (!animeDetails) {
      throw new Error("AnimeDetails not found");
    }
    await animeDetails.destroy();
  }
}
