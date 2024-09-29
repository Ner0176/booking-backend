import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTokenDto } from '../auth.dto';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: JWTokenDto = request.user;
    if (user && user.isAdmin) return true;
    else {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
  }
}
