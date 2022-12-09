import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string

  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string

  @IsNumberString()
  @IsNotEmpty()
  readonly id: string | number

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
