import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config_enviroments from 'src/config_enviroments';
import { TokenPayload } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config_enviroments.KEY)
    configService: ConfigType<typeof config_enviroments>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.JWT_SECRET,
    });
  }
  validate(payload: TokenPayload) {
    return payload;
  }
}
