import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const rawHeaders = request.rawHeaders;

    return data ? rawHeaders[rawHeaders.indexOf(data) + 1] : rawHeaders;
  },
);
