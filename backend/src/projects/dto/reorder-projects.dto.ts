import { IsArray, IsOptional } from 'class-validator';

export class ReorderProjectsDto {
  @IsArray()
  @IsOptional()
  items?: { id: string; order?: number; orderIndex?: number }[];

  @IsArray()
  @IsOptional()
  orders?: { id: string; order?: number; orderIndex?: number }[];
}
