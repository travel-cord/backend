import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyFunction } from 'passport-naver'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get<string>('NAVER_CLIENT_ID'),
      clientSecret: config.get<string>('NAVER_CLIENT_SECRET'),
      callbackURL: config.get<string>('NAVER_REDIRECT_URL')
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done): Promise<VerifyFunction> {
    return done(null, profile)
  }
}
