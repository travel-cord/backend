import { Controller, Get, HttpStatus, Logger, Req, Res, UseGuards } from '@nestjs/common'
import { GoogleGuard, KakaoGuard, NaverGuard } from '@auth/interface/guards'
import { Request, Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateUserCommand } from '@user/application/command/create-user.command'
import { User } from '@user/domain/user'

@Controller('auth')
export class AuthController {
  constructor(private readonly logger: Logger, private readonly commandBus: CommandBus) {}

  @Get('kakao')
  @UseGuards(KakaoGuard)
  kakao() {
    return HttpStatus.OK
  }

  @Get('kakao/callback')
  @UseGuards(KakaoGuard)
  kakaoCallBack(@Req() request, @Res() response: Response) {
    this.logger.verbose(request.user)

    const { id, name, email, birthday, gender, age, profileImg } = request.user

    const command = new CreateUserCommand(id, name, email, birthday, age, gender, profileImg)
    const result = this.commandBus.execute(command)

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
    this.logger.verbose(request.user, 'naver.user.dto')
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
