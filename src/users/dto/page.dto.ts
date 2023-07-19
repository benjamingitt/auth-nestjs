import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class SearchFieldDto {
  @ApiProperty({
    enum: ['name', 'email', 'telephone'],
    isArray: true,
    required: false,
  })
  searchField: string[];
}

export class OptionsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  size?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  page?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  selectSearch?: SearchFieldDto;

  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;
}
