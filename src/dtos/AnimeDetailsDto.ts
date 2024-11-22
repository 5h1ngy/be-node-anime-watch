import { IsString, IsOptional, IsUUID } from "class-validator";

export class AnimeDetailsDto {
  @IsUUID()
  id!: string;

  @IsString()
  type!: string;

  @IsString()
  @IsOptional()
  image?: string | null;

  constructor(id: string, type: string, image: string | null) {
    this.id = id;
    this.type = type;
    this.image = image;
  }
}
