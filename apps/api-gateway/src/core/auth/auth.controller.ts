import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { Request, Response as ExpressResponse, CookieOptions } from 'express';
import { AppConfig } from '../../configs/app.config';
import { BaseResponse } from 'common/dto/base-response.dto';
import { DataBusAuthService } from 'apps/data-bus/src/contract/auth.service';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly appConfig: AppConfig,
    private readonly dataBusAuthService: DataBusAuthService,
  ) {}

  private readonly tokenHeaderName = 'Authorization';
  private readonly tokenCookieName = 'AccessToken';
  private readonly tokenCookieSettings: CookieOptions = {
    httpOnly: true,
    secure: !this.appConfig.devEnv,
    maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
    sameSite: 'strict',
  };

  @Post('register')
  async register(
    @Body() registerDTO: RegisterDTO,
    @Res() res: ExpressResponse,
  ) {
    const result = await this.dataBusAuthService.register(registerDTO);
    if (result.statusCode !== HttpStatus.OK) {
      res.status(result.statusCode).send(result);
      return;
    }

    const { token, ...data } = result.data!;
    res.setHeader(this.tokenHeaderName, token);
    res.cookie(this.tokenCookieName, token, this.tokenCookieSettings);
    res.status(result.statusCode).send({ ...result, data });
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO, @Res() res: ExpressResponse) {
    const result = await this.dataBusAuthService.login(loginDTO);
    if (result.statusCode !== HttpStatus.OK) {
      res.status(result.statusCode).send(result);
      return;
    }

    const { token, ...data } = result.data!;
    res.setHeader(this.tokenHeaderName, token);
    res.cookie(this.tokenCookieName, token, this.tokenCookieSettings);
    res.status(result.statusCode).send({ ...result, data });
  }

  @Get('me')
  async me(@Req() req: Request, @Res() res: ExpressResponse) {
    const user = req.user;

    if (!user) {
      const unsuccessfulResponse = new BaseResponse({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
      res.status(unsuccessfulResponse.statusCode).send(unsuccessfulResponse);
      return;
    }

    const successfulResponse = new BaseResponse({
      statusCode: HttpStatus.OK,
      data: user,
    });
    res.status(successfulResponse.statusCode).send(successfulResponse);
  }
}
