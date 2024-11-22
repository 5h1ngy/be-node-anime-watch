import TagReferences from "@/models/TagReferences";
import { TagReferencesDto } from "@/dtos/TagReferencesDto";
import { Service } from "typedi";

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Service()
export class TagReferencesService {
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResult<TagReferencesDto>> {
        const offset = (page - 1) * limit;
        const { rows, count: total } = await TagReferences.findAndCountAll({
            offset,
            limit,
        });

        const data = rows.map((tagRef) => new TagReferencesDto(tagRef.id, tagRef.tagId));
        const totalPages = Math.ceil(total / limit);

        return { data, total, page, limit, totalPages };
    }

    async getById(id: string): Promise<TagReferencesDto | null> {
        const tagRef = await TagReferences.findByPk(id);
        if (!tagRef) return null;

        return new TagReferencesDto(tagRef.id, tagRef.tagId);
    }
}
