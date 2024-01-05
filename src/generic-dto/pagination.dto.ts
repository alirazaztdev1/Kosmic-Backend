import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    minimum: 1,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 1
  })
  page: number;

  @ApiProperty({
    minimum: 0,
    maximum: 50,
    default: 10
  })
  pageSize: number;

  @ApiProperty({ default: 'id' })
  @IsNotEmpty()
  sortColumn: string;

  @ApiProperty({ default: { id: 'DESC' } })
  @IsNotEmpty()
  order: any;

  @ApiProperty()
  condition: any;

  @ApiProperty()
  attributes?: any | undefined;
}
