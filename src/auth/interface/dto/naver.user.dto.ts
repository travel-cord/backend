import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class NaverRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsEmail()
  readonly email?: string
}
