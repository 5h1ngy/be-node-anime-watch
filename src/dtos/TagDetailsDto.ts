import { IsString, IsOptional, IsUUID } from "class-validator";

export class TagDetailsDto {
  @IsUUID()
  id!: string | null;

  @IsString()
  @IsOptional()
  label!: string | null;

  constructor(
    id: string,
    label: string | null
  ) {
    this.id = id;
    this.label = label;
  }
}
