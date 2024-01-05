import { ApiProperty } from '@nestjs/swagger';

export class ConditionDto {
  @ApiProperty()
  condition: any;
}
