import { Request } from 'express';
import { User } from 'src/users/models/user.model';

export interface ExpressRequest extends Request {
  user?: User;
}
