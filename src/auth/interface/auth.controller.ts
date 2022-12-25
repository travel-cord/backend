import { Controller, Get, HttpStatus, Logger, Req, Res, UseGuards } from '@nestjs/common'
import { GoogleGuard, KakaoGuard, NaverGuard } from '@auth/interface/guards'
import { Request, Response } from 'express'
import { CommandBus } from '@nestjs/cqrs'
import { CreateUserCommand } from '@user/application/command/create-user.command'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
    private readonly commandBus: CommandBus
  ) {}

  @Get('kakao')
  @UseGuards(KakaoGuard)
  kakao() {
    this.logger.debug('kakao')
    return HttpStatus.OK
  }

  @Get('kakao/callback')
  @UseGuards(KakaoGuard)
  kakaoCallBack(@Req() request, @Res() response: Response) {
    const { id, name, email, birthday, gender, age, profileImg } = request.user
    const command = new CreateUserCommand(id, name, email, birthday, age, gender, profileImg)
    const user = this.commandBus.execute(command)
    response.cookie('@tc-token', user)
    return response.redirect(this.config.get<string>('WEB_FRONT_DOMAIN'))
  }

  @Get('naver')
  @UseGuards(NaverGuard)
  naver() {
    return HttpStatus.OK
  }

  @Get('naver/callback')
  @UseGuards(NaverGuard)
  naverCallBack(@Req() request, @Res() response: Response) {
    const { id, name, email, birthday, gender, age, profileImg } = request.user
    const command = new CreateUserCommand(id, name, email, birthday, age, gender, profileImg)
    const user = this.commandBus.execute(command)
    response.cookie('@tc-token', user)
    return response.redirect(this.config.get<string>('WEB_FRONT_DOMAIN'))
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  google() {
    return HttpStatus.OK
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleCallBack(@Req() request, @Res() response: Response) {
    const { id, name, email, birthday, gender, age, profileImg } = request.user
    const command = new CreateUserCommand(id, name, email, birthday, age, gender, profileImg)
    const user = this.commandBus.execute(command)
    response.cookie('@tc-token', user)
    return response.redirect(this.config.get<string>('WEB_FRONT_DOMAIN'))
  }
}
