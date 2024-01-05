import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import { EmailDto } from "src/generic-dto/email.dto";

export class LoginWithGoogleDto extends EmailDto {
  @ApiProperty({
    description: "accessToken",
    example: "",
  })
  @IsNotEmpty({ message: "Access token can not be empty" })
  @IsString()
  accessToken: string;
}
