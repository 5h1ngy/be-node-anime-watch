import AnimeTags from "@/models/AnimeTags";
import { AnimeTagsDto } from "@/dtos/AnimeTagsDto";
import { Service } from "typedi";

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Service()
export class AnimeTagsService {
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResult<AnimeTagsDto>> {
        const offset = (page - 1) * limit;
        const { rows, count: total } = await AnimeTags.findAndCountAll({
            offset,
            limit,
            // include: [
            //     { association: "animeDetail" },
            //     { association: "tagDetail" },
            // ],
        });

        const data = rows.map((animeTag) => new AnimeTagsDto(animeTag._uuid, animeTag.animeDetail, animeTag.tagDetail));
        const totalPages = Math.ceil(total / limit);

        return { data, total, page, limit, totalPages };
    }

    async getById(_uuid: string): Promise<AnimeTagsDto | null> {
        const animeTag = await AnimeTags.findByPk(_uuid, {
            // include: [
            //     { association: "animeDetail" },
            //     { association: "tagDetail" },
            // ],
        });
        if (!animeTag) return null;

        return new AnimeTagsDto(animeTag._uuid, animeTag.animeDetail, animeTag.tagDetail);
    }
}
