import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-kakao'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get<string>('KAKAO_REST_API_KEY'),
      callbackURL: config.get<string>('KAKAO_REDIRECT_URL')
    })
  }
}
