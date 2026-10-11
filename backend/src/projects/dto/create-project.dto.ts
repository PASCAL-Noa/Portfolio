import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum ProjectCategoryEnum {
  GAME = 'game',
  SOFTWARE = 'software',
  WEB = 'web',
  OTHER = 'other',
}

export class ProjectTagDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional()
  variant?: string;
}

export class ProjectMediaDto {
  @IsString()
  @IsNotEmpty()
  type: 'video' | 'image';

  @IsString()
  @IsNotEmpty()
  src: string;

  @IsString()
  @IsOptional()
  alt?: string;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  id: string; // Slug, e.g. "rebreaker"

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(ProjectCategoryEnum)
  category: ProjectCategoryEnum;

  @IsString()
  @IsNotEmpty()
  image: string; // 16:9 banner for card

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[];

  @IsString()
  @IsOptional()
  githubUrl?: string;

  @IsString()
  @IsOptional()
  liveUrl?: string;

  @IsString()
  @IsOptional()
  detailUrl?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsInt()
  @IsOptional()
  orderIndex?: number;

  @IsOptional()
  detail?: any;

  // Detail Page Fields
  @IsString()
  @IsOptional()
  banner?: string;

  @IsString()
  @IsOptional()
  detailDescription?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  team?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTagDto)
  @IsOptional()
  tags?: ProjectTagDto[];

  @IsString()
  @IsOptional()
  downloadUrl?: string;

  @IsString()
  @IsOptional()
  downloadLabel?: string;

  @IsString()
  @IsOptional()
  docUrl?: string;

  @IsString()
  @IsOptional()
  docLabel?: string;

  @IsString()
  @IsOptional()
  videoUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectMediaDto)
  @IsOptional()
  media?: ProjectMediaDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  thumbnails?: string[];
}
