import { HttpStatus } from '@nestjs/common';

type BaseResponseArgs<T> = {
  statusCode?: HttpStatus;
  message?: string;
  data?: T | null;
};

export class BaseResponse<T = undefined> {
  success: boolean;
  statusCode: HttpStatus;
  message?: string;
  data?: T | null;

  constructor(args: BaseResponseArgs<T>) {
    const { statusCode = HttpStatus.OK, message, data } = args;

    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
