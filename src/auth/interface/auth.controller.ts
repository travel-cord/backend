import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common'
import { GoogleGuard, KakaoGuard, NaverGuard } from '@auth/interface/guards'
import { MyLogger } from '@config/logger.config'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly logger: MyLogger) {}

  @Get('kakao')
  @UseGuards(KakaoGuard)
  public async kakao() {
    return HttpStatus.OK
  }

  @Get('kakao/callback')
  @UseGuards(KakaoGuard)
  public async kakaoCallBack(@Req() request: Request, @Res() response: Response) {
    this.logger.verbose(request.user)
    return response.redirect('http://localhost:3000')
  }

  @Get('naver')
  @UseGuards(NaverGuard)
  public async naver() {
    return HttpStatus.OK
  }

  @Get('naver/callback')
  @UseGuards(NaverGuard)
  public async naverCallBack(@Req() request: Request, @Res() response: Response) {
    this.logger.verbose(request.user)
    return response.redirect('http://localhost:3000')
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  public async google() {
    return HttpStatus.OK
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  public async googleCallBack(@Req() request: Request, @Res() response: Response) {
    this.logger.verbose(request.user)
    return response.redirect('http://localhost:3000')
  }
}
