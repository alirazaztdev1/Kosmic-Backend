import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EmailDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;
}
