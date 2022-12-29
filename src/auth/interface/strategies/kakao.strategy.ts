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
    const user = profile._json
    const data = {
      id: user.id,
      name: user.properties.nickname,
      email: user.kakao_account.has_email ? user.kakao_account.email : 'DENIED'
    }
    return done(null, data)
  }
}
