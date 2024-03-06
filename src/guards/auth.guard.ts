import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.session.userId) {
      throw new UnauthorizedException('Not authorized');
    }
    // return request.session.userId;
    return true;
  }
}
