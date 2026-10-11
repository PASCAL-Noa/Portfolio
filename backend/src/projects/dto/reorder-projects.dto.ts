import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ReorderProjectItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsInt()
  order: number;
}

export class ReorderProjectsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderProjectItemDto)
  items: ReorderProjectItemDto[];
}
