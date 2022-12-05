import { Injectable, NotAcceptableException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyFunction } from 'passport-kakao'
import { ConfigService } from '@nestjs/config'
import { KakaoUserDto } from '@auth/interface/dto'

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
    if (!user) {
      throw new NotAcceptableException('not kakao user')
    }
    const data: KakaoUserDto = {
      accessToken,
      refreshToken,
      id: user.id,
      name: user.properties.name,
      profileImg: user.properties.profile_image,
      age: user.kakao_account.has_age ? user.kakao_account.age : 'DENIED',
      email: user.kakao_account.has_email ? user.kakao_account.email : 'DENIED',
      gender: user.kakao_account.has_gender ? user.kakao_account.gender : 'DENIED',
      birthday: user.kakao_account.has_birthday ? user.kakao_account.birthday : 'DENIED'
    }
    return done(null, data)
  }
}
