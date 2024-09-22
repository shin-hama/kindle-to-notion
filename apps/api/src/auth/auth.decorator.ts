import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CustomContext, AuthenticatedUser } from '@/types';

export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  AuthenticatedUser
>((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext<CustomContext>().req.user;
});
