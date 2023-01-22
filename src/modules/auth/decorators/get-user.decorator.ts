import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user) {
    throw new BadRequestException(
      'User not found. Please check your request and try again.',
    );
  }

  const props = Array.isArray(data) ? data : [data];

  if (props.length === 0 || !props[0]) {
    return user;
  }

  const info = props.reduce((acc, key) => {
    if (user[key]) {
      acc[key] = user[key];
    }

    return acc;
  }, {});

  if (!Object.keys(info).length) {
    throw new BadRequestException(
      'User info not found. Please check your request and try again.',
    );
  }

  return info;
});
