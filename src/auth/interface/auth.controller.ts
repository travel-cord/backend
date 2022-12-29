import { Controller, Get, HttpStatus, Logger, Req, UseGuards } from '@nestjs/common'
import { KakaoGuard } from '@auth/interface/guards'
import { Request } from 'express'
import { KakaoUserDto } from '@auth/interface/dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly logger: Logger) {}

  @Get('kakao')
  @UseGuards(KakaoGuard)
  kakao() {
    return HttpStatus.OK
  }

  @Get('kakao/callback')
  @UseGuards(KakaoGuard)
  kakaoCallBack(@Req() request: Request) {
    this.logger.verbose(request.user)
    return request.user as KakaoUserDto
  }
}
