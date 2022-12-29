import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator'

export class GoogleUserDto {
  @IsNumberString()
  @IsNotEmpty()
  readonly id: string | number

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsEmail()
  readonly email?: string
}
