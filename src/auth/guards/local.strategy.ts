import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'telephone' });
  }

  async validate(telephone: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(telephone, password);

    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    return user;
  }
}
