// src/services/AssetImagesService.ts
import AssetImages from "@/models/AssetImages";
import { Service } from "typedi";

@Service()
export class AssetImagesService {
    async getById(id: string): Promise<AssetImages | null> {
        return await AssetImages.findByPk(id);
    }

    async getAll(page: number = 1, limit: number = 10): Promise<{ data: AssetImages[]; total: number; page: number; limit: number; totalPages: number }> {
        const offset = (page - 1) * limit;
        const { rows, count: total } = await AssetImages.findAndCountAll({
            offset,
            limit,
        });

        const totalPages = Math.ceil(total / limit);
        return { data: rows, total, page, limit, totalPages };
    }
}
