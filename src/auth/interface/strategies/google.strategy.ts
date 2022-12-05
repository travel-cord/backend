import { Injectable, NotAcceptableException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { request } from 'express'
import { GoogleUserDto, NaverUserDto } from '@auth/interface/dto'

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
    if (!user) {
      throw new NotAcceptableException('not naver user')
    }
    const data: GoogleUserDto = {
      accessToken,
      refreshToken,
      id: user.sub,
      name: user.name,
      email: user.email_verified ? user.email : 'DENIED',
      birthday: '',
      age: '',
      gender: '',
      profileImg: user.picture
    }
    return done(null, data)
  }
}
