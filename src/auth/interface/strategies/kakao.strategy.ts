import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyFunction } from 'passport-kakao'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get<string>('KAKAO_CLIENT_ID'),
      callbackURL: config.get<string>('KAKAO_REDIRECT_URL')
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: any): Promise<VerifyFunction> {
    return done(null, profile._json)
  }
}
