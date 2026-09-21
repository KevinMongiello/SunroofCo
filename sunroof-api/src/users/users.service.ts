import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.db.orm.public.User.all();
  }

  findOne(id: string) {
    return this.prisma.db.orm.public.User.first({ id });
  }

  create(dto: CreateUserDto) {
    return this.prisma.db.orm.public.User.create(dto);
  }

  update(id: string, dto: UpdateUserDto) {
    return this.prisma.db.orm.public.User.where({ id }).update(dto);
  }

  delete(id: string) {
    return this.prisma.db.orm.public.User.where({ id }).delete();
  }
}
