import { Controller, Get, HttpStatus, Logger, NotAcceptableException, Req, Res, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { KakaoRequestDto, NaverRequestDto, GoogleRequestDto } from './dto'
import { GoogleGuard, KakaoGuard, NaverGuard } from './guards'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly command: CommandBus,
    private readonly query: QueryBus
  ) {}

  @Get('kakao')
  @UseGuards(KakaoGuard)
  public async kakao() {
    return HttpStatus.OK
  }

  @Get('kakao/callback')
  @UseGuards(KakaoGuard)
  public async kakaoCallBack(@Req() request: KakaoRequestDto, @Res() response) {
    this.logger.verbose(request)
    if (!request) {
      throw new NotAcceptableException('not kakao user')
    }
    return response.direction('/')
  }

  @Get('naver')
  @UseGuards(NaverGuard)
  public async naver() {
    return HttpStatus.OK
  }

  @Get('naver/callback')
  @UseGuards(NaverGuard)
  public async naverCallBack(@Req() request: NaverRequestDto, @Res() response) {
    this.logger.verbose(request)
    if (!request) {
      throw new NotAcceptableException('not naver user')
    }
    return response.direction('/')
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  public async google() {
    return HttpStatus.OK
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  public async googleCallBack(@Req() request: GoogleRequestDto, @Res() response) {
    this.logger.verbose(request)
    if (!request) {
      throw new NotAcceptableException('not google user')
    }
    return response.direction('/')
  }
}
