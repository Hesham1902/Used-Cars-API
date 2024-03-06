import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.session.userId;
    if (userId && context.getHandler().name !== 'signOut') {
      console.log('trying to fetch the user from database');
      // We need to communicate with the custom decorator and give it the user
      request.currentUser = await this.userService.findOne(userId);
    }
    return handler.handle();
  }
}
