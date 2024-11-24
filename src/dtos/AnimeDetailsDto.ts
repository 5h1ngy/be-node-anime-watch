import { IsString, IsOptional, IsUUID, IsArray, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

export class ImageDto {
  @IsUUID()
  id!: string | null;

  @IsString()
  @IsOptional()
  thumbnail!: string | null;
}

export class TagDto {
  @IsUUID()
  id!: string | null;

  @IsString()
  @IsOptional()
  label!: string | null;
}

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

  constructor(
    id: string, title: string | null,
    type: string | null,
    image: ImageDto | null,
    tags: Array<TagDto> | null
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.image = image;
    this.tags = tags;
  }
}
