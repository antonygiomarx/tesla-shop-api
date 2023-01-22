import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthService } from '../auth.service';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces';
import { User } from '../../users/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      this.logger.error(`User not found: ${id}`);
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }

    if (!user.active) {
      this.logger.error(`User not active: ${id}`);
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }

    return user;
  }
}
