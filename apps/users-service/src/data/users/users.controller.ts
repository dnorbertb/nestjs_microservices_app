import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

import { usersServiceMessagePatterns } from 'apps/users-service/src/static/message-patterns';
import { CreateUserPayload } from './types/create-user-payload.type';
import { FindByEmailPayload } from './types/find-by-email-payload.type';
import { RemoveByIdPayload } from './types/remove-by-id.payload';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(usersServiceMessagePatterns.createUser)
  create(@Payload() payload: CreateUserPayload) {
    return this.usersService.create(payload);
  }

  @MessagePattern(usersServiceMessagePatterns.removeById)
  remove(@Payload() payload: RemoveByIdPayload) {
    return this.usersService.removeById(payload);
  }

  @MessagePattern(usersServiceMessagePatterns.findByEmail)
  findById(@Payload() payload: FindByEmailPayload) {
    return this.usersService.findByEmail(payload);
  }
}
