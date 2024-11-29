import { IsString, IsOptional, IsUUID, IsArray, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

/**
 * DTO for representing image details.
 */
export class ImageDto {
  @IsUUID()
  id!: string | null;

  @IsString()
  @IsOptional()
  thumbnail!: string | null;
}

/**
 * DTO for representing tag details.
 */
export class TagDto {
  @IsUUID()
  id!: string | null;

  @IsString()
  @IsOptional()
  label!: string | null;
}

/**
 * DTO for representing anime details.
 */
export class AnimeDetailsDto {
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags!: Array<TagDto> | null;

  @IsString()
  description!: string | null;

  constructor(
    id: string,
    title: string | null,
    type: string | null,
    image: ImageDto | null,
    tags: Array<TagDto> | null,
    description: string | null
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.image = image;
    this.tags = tags;
    this.description = description;
  }
}
