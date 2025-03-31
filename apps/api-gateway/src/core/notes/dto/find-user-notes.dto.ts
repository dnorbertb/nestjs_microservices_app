import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsDefined,
} from 'class-validator';

export class FindUserNotesQueryDTO {
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Page must be greater than or equal to 1.' })
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'PerPage must be greater than or equal to 1.' })
  perPage?: number;

  @IsOptional()
  @IsString()
  @IsDefined({ message: 'Search string must be a valid string if provided.' })
  search?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'SortOrder must be either ASC or DESC.' })
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  @IsIn(['updatedAt', 'createdAt'], {
    message: 'SortBy must be either updatedAt or createdAt.',
  })
  sortBy?: 'updatedAt' | 'createdAt';
}
