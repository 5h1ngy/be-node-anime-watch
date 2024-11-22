import TagDetails from "@/models/TagDetails";
import { TagDetailsDto } from "@/dtos/TagDetailsDto";
import { Service } from "typedi";

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Service()
export class TagDetailsService {
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResult<TagDetailsDto>> {
        const offset = (page - 1) * limit;
        const { rows, count: total } = await TagDetails.findAndCountAll({
            offset,
            limit,
            // include: [{ association: "tag" }],
        });

        const data = rows.map((tagDetail) => new TagDetailsDto(tagDetail.id, tagDetail.tagReference, tagDetail.label));
        const totalPages = Math.ceil(total / limit);

        return { data, total, page, limit, totalPages };
    }

    async getById(id: string): Promise<TagDetailsDto | null> {
        const tagDetail = await TagDetails.findByPk(id, { include: [{ association: "tag" }] });
        if (!tagDetail) return null;

        return new TagDetailsDto(tagDetail.id, tagDetail.tagReference, tagDetail.label);
    }
}
