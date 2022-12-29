import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get<string>('GOGGLE_CLIENT_ID'),
      clientSecret: config.get<string>('GOGGLE_CLIENT_SECRET'),
      callbackURL: config.get<string>('GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile']
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    const user = profile._json

    const data = {
      id: user.sub,
      name: user.name,
      email: user.email_verified ? user.email : 'DENIED'
    }
    return done(null, data)
  }
}
