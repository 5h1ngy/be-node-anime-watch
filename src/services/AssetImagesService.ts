import AssetImages from "@/models/AssetImages";
import { AssetImagesDto } from "@/dtos/AssetImagesDto";
import { Service } from "typedi";

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Service()
export class AssetImagesService {
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResult<AssetImagesDto>> {
        const offset = (page - 1) * limit;
        const { rows, count: total } = await AssetImages.findAndCountAll({
            offset,
            limit,
        });

        const data = rows.map((asset) => new AssetImagesDto(asset.id, asset.origin, asset.thumbnail));
        const totalPages = Math.ceil(total / limit);

        return { data, total, page, limit, totalPages };
    }

    async getById(id: string): Promise<AssetImagesDto | null> {
        const asset = await AssetImages.findByPk(id);
        if (!asset) return null;

        return new AssetImagesDto(asset.id, asset.origin, asset.thumbnail);
    }
}
