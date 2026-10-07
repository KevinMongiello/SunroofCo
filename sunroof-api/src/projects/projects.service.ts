import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.db.orm.public.Project.all();
  }

  findOne(id: string) {
    return this.prisma.db.orm.public.Project.first({ id });
  }

  create(dto: CreateProjectDto) {
    return this.prisma.db.orm.public.Project.create(dto);
  }

  update(id: string, dto: UpdateProjectDto) {
    return this.prisma.db.orm.public.Project.where({ id }).update(dto);
  }

  delete(id: string) {
    return this.prisma.db.orm.public.Project.where({ id }).delete();
  }

  async matchByName(name: string) {
    return await this.prisma.db.orm.public.Project.where((p) =>
      p.name.ilike(`%${name}%`),
    ).all();
  }

  getProjectDetails(id: string) {
    return this.prisma.db.orm.public.Project.where({ id })
      .include('users', (userProject) => userProject.include('user'))
      .include('tickets', (ticket) =>
        ticket
          .include('users', (userTicket) => userTicket.include('user'))
          .include('timecards'),
      ).first();
  }
}
