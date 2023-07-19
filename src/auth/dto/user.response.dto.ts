import { ApiProperty } from '@nestjs/swagger';

export class createUserResponseDto {
  @ApiProperty({ description: 'id user' })
  readonly id: number;
  @ApiProperty()
  readonly telephone: number;
}
export class AuthDto {
  @ApiProperty({ description: 'telephone with login' })
  readonly telephone: string | undefined;

  @ApiProperty({ description: 'password with login' })
  readonly password: string;
}
