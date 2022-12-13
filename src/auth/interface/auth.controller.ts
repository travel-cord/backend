import { Controller, Get, HttpStatus, Logger, Req, Res, UseGuards } from '@nestjs/common'
import { GoogleGuard, KakaoGuard, NaverGuard } from '@auth/interface/guards'
import { Request, Response } from 'express'

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
  kakaoCallBack(@Req() request: Request, @Res() response: Response) {
    this.logger.verbose(request.user)
    return response.redirect('http://localhost:3000')
  }

  @Get('naver')
  @UseGuards(NaverGuard)
  naver() {
    return HttpStatus.OK
  }

  @Get('naver/callback')
  @UseGuards(NaverGuard)
  naverCallBack(@Req() request: Request, @Res() response: Response) {
    this.logger.verbose(request.user)
    return response.redirect('http://localhost:3000')
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  google() {
    return HttpStatus.OK
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleCallBack(@Req() request: Request, @Res() response: Response) {
    this.logger.verbose(request.user)
    return response.redirect('http://localhost:3000')
  }
}
