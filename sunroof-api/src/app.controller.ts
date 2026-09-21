import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UsersService } from './users/users.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService
  ) {}

  @Get()
  getHello() {
    return this.usersService.findAll();
  }
}
