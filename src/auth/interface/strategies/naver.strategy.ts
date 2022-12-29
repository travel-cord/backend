import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Profile, Strategy } from 'passport-naver-v2'
import { VerifyFunction } from 'passport-oauth2'

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get<string>('NAVER_CLIENT_ID'),
      clientSecret: config.get<string>('NAVER_CLIENT_SECRET'),
      callbackURL: config.get<string>('NAVER_REDIRECT_URL')
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: any): Promise<VerifyFunction> {
    const user = profile

    const data = {
      id: user.id,
      name: user.nickname,
      email: user.email
    }
    return done(null, data)
  }
}
