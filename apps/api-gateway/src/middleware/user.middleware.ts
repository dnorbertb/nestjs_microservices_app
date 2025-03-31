import { Injectable, NestMiddleware } from '@nestjs/common';
import { DataBusAuthService } from 'apps/data-bus/src/contract/auth.service';
import { Request, NextFunction, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly dataBusAuthService: DataBusAuthService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const token: string =
      req.cookies?.AccessToken ?? req.headers?.authorization;
    const response = await this.dataBusAuthService.verify({ token });
    if (!response.data) {
      req.user = null;
      next();
      return;
    }

    req.user = response.data;
    next();
    return;
  }
}
