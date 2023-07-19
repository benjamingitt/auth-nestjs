import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserExistTelephone implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    if (!request.body.telephone) {
      return;
    }
    const userTelExist = await this.userService.findOneByTel(
      request.body.telephone,
    );

    if (userTelExist) {
      throw new ForbiddenException('This telephone already exist');
    }
    return true;
  }
}
