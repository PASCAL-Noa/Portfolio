import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum TimelineCategoryEnum {
  EDU = 'edu',
  PRO = 'pro',
  ONLINE = 'online',
  TECH = 'tech',
}

export class CreateTimelineItemDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  period: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsEnum(TimelineCategoryEnum)
  type: TimelineCategoryEnum;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  linkText?: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsInt()
  @IsOptional()
  orderIndex?: number;
}
