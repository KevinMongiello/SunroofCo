import 'reflect-metadata';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ValidationModule } from './validation.module.js';
import { UsersController } from '../users/users.controller.js';
import { UsersService } from '../users/users.service.js';
import { TimecardsController } from '../timecards/timecards.controller.js';
import { TimecardsService } from '../timecards/timecards.service.js';
import { ProjectsController } from '../projects/projects.controller.js';
import { ProjectsService } from '../projects/projects.service.js';
import { TicketsController } from '../tickets/tickets.controller.js';
import { TicketsService } from '../tickets/tickets.service.js';
import { ReportsController } from '../reports/reports.controller.js';
import { ReportsService } from '../reports/reports.service.js';
import { AiController } from '../ai/ai.controller.js';
import { AiService } from '../ai/ai.service.js';

const id = 'b45f6471-324a-49cc-a526-c4cd692832b0';
const bodies = {
  users: { name: 'Ada', email: 'ada@example.com', costPerHour: 0 },
  timecards: { userId: id, date: '2026-10-12', hoursWorked: 7.5 },
  projects: { name: 'Roof repair', userIds: [id], startDate: '2024-02-29' },
  tickets: { projectId: id, title: 'Inspect roof', estimatedHours: 2.5 },
};
const service = {
  create: vi.fn((dto) => dto),
  update: vi.fn((_id, dto) => dto),
  findOne: vi.fn(() => ({})),
  delete: vi.fn(() => ({})),
  findAll: vi.fn((query) => query ?? []),
  labor: vi.fn(() => ({})),
  userHours: vi.fn(() => ({})),
  ask: vi.fn((message) => ({ message })),
};

describe('Global API request validation', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ValidationModule],
      controllers: [
        UsersController,
        TimecardsController,
        ProjectsController,
        TicketsController,
        ReportsController,
        AiController,
      ],
      providers: [
        UsersService,
        TimecardsService,
        ProjectsService,
        TicketsService,
        ReportsService,
        AiService,
      ].map((provide) => ({ provide, useValue: service })),
    }).compile();
    app = module.createNestApplication();
    await app.listen(0, '127.0.0.1');
  });
  beforeEach(() => vi.clearAllMocks());
  afterAll(async () => {
    await app?.close();
  });

  it.each(Object.entries(bodies))(
    'accepts a valid %s body',
    async (route, body) => {
      await request(app.getHttpServer())
        .post(`/${route}`)
        .send(body)
        .expect(201, body);
      expect(service.create).toHaveBeenCalledOnce();
    },
  );

  it.each(Object.keys(bodies))(
    'rejects missing and unknown fields on %s',
    async (route) => {
      await request(app.getHttpServer()).post(`/${route}`).send({}).expect(400);
      await request(app.getHttpServer())
        .post(`/${route}`)
        .send({ ...bodies[route as keyof typeof bodies], unexpected: true })
        .expect(400);
      expect(service.create).not.toHaveBeenCalled();
    },
  );

  it.each([
    ['users', { email: 'invalid' }],
    ['users', { name: '   ' }],
    ['users', { costPerHour: -1 }],
    ['users', { costPerHour: '25' }],
    ['users', { priceToCustomerPerHour: null }],
    ['timecards', { userId: 'invalid' }],
    ['timecards', { date: '2026-02-30' }],
    ['timecards', { date: '2026-10-12T00:00:00Z' }],
    ['timecards', { hoursWorked: 9 }],
    ['timecards', { hoursWorked: -1 }],
    ['timecards', { hoursWorked: '7' }],
    ['timecards', { userId: null }],
    ['projects', { name: '' }],
    ['projects', { status: 'invalid' }],
    ['projects', { status: null }],
    ['projects', { userIds: ['invalid'] }],
    ['projects', { startDate: '2025-02-29' }],
    ['tickets', { projectId: null }],
    ['tickets', { priority: 'invalid' }],
    ['tickets', { estimatedHours: -1 }],
    ['tickets', { userIds: id }],
    ['tickets', { completedAt: '2026-13-01' }],
  ])('rejects invalid %s PATCH fields: %j', async (route, body) => {
    await request(app.getHttpServer())
      .patch(`/${route}/${id}`)
      .send(body)
      .expect(400);
    expect(service.update).not.toHaveBeenCalled();
  });

  it.each([
    ['users', { name: 'Updated' }],
    ['timecards', { hoursWorked: 0 }],
    ['projects', { status: 'ACTIVE' }],
    ['tickets', { title: 'Updated' }],
  ])('allows a partial %s update', async (route, body) => {
    await request(app.getHttpServer())
      .patch(`/${route}/${id}`)
      .send(body)
      .expect(200, body);
  });

  it.each(Object.keys(bodies))(
    'validates UUIDs on every %s ID route',
    async (route) => {
      await request(app.getHttpServer()).get(`/${route}/invalid`).expect(400);
      await request(app.getHttpServer())
        .patch(`/${route}/invalid`)
        .send({})
        .expect(400);
      await request(app.getHttpServer())
        .delete(`/${route}/invalid`)
        .expect(400);
      expect(service.findOne).not.toHaveBeenCalled();
      expect(service.update).not.toHaveBeenCalled();
      expect(service.delete).not.toHaveBeenCalled();
    },
  );

  it('transforms a valid timecard query and preserves false', async () => {
    await request(app.getHttpServer())
      .get('/timecards')
      .query({
        includeUser: 'false',
        limit: '5',
        orderBy: 'date',
        orderDir: 'desc',
      })
      .expect(200);
    expect(service.findAll).toHaveBeenCalledWith({
      includeUser: false,
      limit: 5,
      orderBy: 'date',
      orderDir: 'desc',
    });
  });

  it.each([
    { includeUser: 'yes' },
    { limit: '0' },
    { limit: '-1' },
    { limit: '1.5' },
    { limit: 'abc' },
    { limit: ['1', '2'] },
    { orderBy: 'constructor' },
    { orderDir: 'down' },
    { extra: 'field' },
  ])('rejects invalid timecard query %j', async (query) => {
    await request(app.getHttpServer())
      .get('/timecards')
      .query(query)
      .expect(400);
    expect(service.findAll).not.toHaveBeenCalled();
  });

  it.each(['labor', 'user-hours'])(
    'validates %s report dates',
    async (route) => {
      const api = () => request(app.getHttpServer()).get(`/reports/${route}`);
      await api().expect(400);
      await api()
        .query({ startDate: '2026-02-30', endDate: '2026-03-01' })
        .expect(400);
      await api()
        .query({ startDate: '2026-10-12', endDate: '2026-10-01' })
        .expect(400);
      expect(service.labor).not.toHaveBeenCalled();
      expect(service.userHours).not.toHaveBeenCalled();
      await api()
        .query({ startDate: '2026-10-01', endDate: '2026-10-12' })
        .expect(200);
    },
  );

  it('validates AI messages before invoking the service', async () => {
    for (const body of [
      {},
      { message: '' },
      { message: '  ' },
      { message: 42 },
      { message: 'Hi', extra: 1 },
    ]) {
      await request(app.getHttpServer()).post('/ai').send(body).expect(400);
    }
    expect(service.ask).not.toHaveBeenCalled();
    await request(app.getHttpServer())
      .post('/ai')
      .send({ message: 'Hi' })
      .expect(201);
    expect(service.ask).toHaveBeenCalledWith('Hi');
  });
});
