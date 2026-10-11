import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ReorderTimelineEntryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsInt()
  order: number;
}

export class ReorderTimelineDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderTimelineEntryDto)
  items: ReorderTimelineEntryDto[];
}
