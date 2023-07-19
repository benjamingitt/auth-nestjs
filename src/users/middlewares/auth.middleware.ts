import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from '../users.service';
import { ExpressRequest } from 'src/types/expressRequest.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    // if (!req.headers.authorization) {
    //   req.user = null;
    //   next();
    //   return;
    // }

    //const token = req.headers.authorization.split(' ')[1];

    try {
      //   const decode: any = verify(token, process.env.JWTKEY);

      //   const user = await this.userService.findOneById(decode.id);
      //   req.user = user.dataValues;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
