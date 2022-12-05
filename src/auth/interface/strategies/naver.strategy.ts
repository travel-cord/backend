import { Injectable, NotAcceptableException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Profile, Strategy } from 'passport-naver-v2'
import { VerifyFunction } from 'passport-oauth2'
import { NaverUserDto } from '@auth/interface/dto'

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
    if (!user) {
      throw new NotAcceptableException('not naver user')
    }
    const data: NaverUserDto = {
      accessToken,
      refreshToken,
      id: user.id,
      name: user.nickname,
      email: user.email,
      birthday: user.birthday,
      age: user.age,
      gender: user.gender,
      profileImg: user.profileImage
    }
    return done(null, data)
  }
}
