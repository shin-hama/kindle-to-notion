import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SESSION_TOKEN_KEY } from '@kino/shared';
import { UsersService } from '@/users/users.service';
import { CustomContext } from '@/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<CustomContext>();

    const sessionToken = req.cookies[SESSION_TOKEN_KEY];
    if (!sessionToken) {
      throw new UnauthorizedException('No session token found');
    }

    try {
      const payload = await this.userService.veryfy(sessionToken);

      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid session token');
    }
  }
}
