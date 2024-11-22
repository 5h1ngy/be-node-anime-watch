// src/services/AnimeTagsService.ts
import AnimeTags from "@/models/AnimeTags";
import { Service } from "typedi";

@Service()
export class AnimeTagsService {
    async getTagsByAnimeId(animeId: string) {
        const tags = await AnimeTags.findAll({
            where: { animeDetailId: animeId },
            include: [{ association: "tagDetails" }],
        });
        return tags;
    }
}
