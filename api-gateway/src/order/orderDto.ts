import { ApiProperty } from '@nestjs/swagger';

export class createOrderDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
}
