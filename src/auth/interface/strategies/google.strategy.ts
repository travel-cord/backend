import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get<string>('GOGGLE_CLIENT_ID'),
      clientSecret: config.get<string>('GOGGLE_CLIENT_SECRET'),
      callbackURL: config.get<string>('GOOGLE_REDIRECT_URL')
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    return done(null, profile)
  }
}
