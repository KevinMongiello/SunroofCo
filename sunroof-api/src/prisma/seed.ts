// src/prisma/seed.ts

import { db } from './db.js';

// Clear dependent rows first

await db.orm.public.TimeCard
  .where((t) => t.id.isNotNull())
  .deleteAll();

await db.orm.public.User
  .where((u) => u.id.isNotNull())
  .deleteAll();

const users = await db.orm.public.User.createAll([
  {
    email: 'kevin@example.com',
    name: 'Kevin',
  },
  {
    email: 'john@example.com',
    name: 'John',
  },
  {
    email: 'sarah@example.com',
    name: 'Sarah',
  },
]);

await db.orm.public.TimeCard.createAll([
  // Kevin
  {
    userId: users[0].id,
    date: '2026-07-15',
    hoursWorked: 8,
  },
  {
    userId: users[0].id,
    date: '2026-08-03',
    hoursWorked: 6.5,
  },
  {
    userId: users[0].id,
    date: '2026-08-20',
    hoursWorked: 9,
  },
  {
    userId: users[0].id,
    date: '2026-09-02',
    hoursWorked: 7.5,
  },
  {
    userId: users[0].id,
    date: '2026-09-10',
    hoursWorked: 8,
  },

  // John
  {
    userId: users[1].id,
    date: '2026-07-22',
    hoursWorked: 4,
  },
  {
    userId: users[1].id,
    date: '2026-08-01',
    hoursWorked: 8,
  },
  {
    userId: users[1].id,
    date: '2026-08-29',
    hoursWorked: 5.5,
  },
  {
    userId: users[1].id,
    date: '2026-09-05',
    hoursWorked: 10,
  },

  // Sarah
  {
    userId: users[2].id,
    date: '2026-06-30',
    hoursWorked: 7,
  },
  {
    userId: users[2].id,
    date: '2026-07-01',
    hoursWorked: 7.5,
  },
  {
    userId: users[2].id,
    date: '2026-09-12',
    hoursWorked: 8.25,
  },
]);

console.log('Seed complete');

await db.close();