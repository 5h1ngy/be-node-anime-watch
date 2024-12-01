import { IsString, IsUUID, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";
import { ImageDto } from './AnimeDetailsDto'

/**
 * DTO for representing anime details.
 */
export class AnimeNewestDto {
  @IsUUID()
  id!: string;

  @IsString()
  title!: string | null;

  @IsString()
  type!: string | null;

  @ValidateNested()
  @IsObject()
  @Type(() => ImageDto)
  image!: ImageDto | null;

  constructor(
    id: string,
    title: string | null,
    type: string | null,
    image: ImageDto | null,
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.image = image;
  }
}
