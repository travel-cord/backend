import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class KakaoRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsEmail()
  readonly email?: string

  @IsString()
  readonly birthday?: string

  @IsString()
  readonly gender?: string

  @IsString()
  readonly age?: string

  @IsString()
  readonly profileImg?: string
}
