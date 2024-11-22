// src/services/TagDetailsService.ts
import TagDetails from "@/models/TagDetails";
import { Service } from "typedi";

@Service()
export class TagDetailsService {
    async getAll(): Promise<TagDetails[]> {
        return await TagDetails.findAll();
    }

    async getById(id: string): Promise<TagDetails | null> {
        return await TagDetails.findByPk(id);
    }
}
