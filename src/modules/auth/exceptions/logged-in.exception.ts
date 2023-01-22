import { HttpException, HttpStatus } from '@nestjs/common';

export class LoggedInException extends HttpException {
  constructor() {
    super('Logged In', HttpStatus.OK);
  }
}
