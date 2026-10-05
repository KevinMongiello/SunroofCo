import { db } from './db.js';

async function main() {
  // --------------------------------------------------
  // Reset database
  // Delete children / join rows before parent rows
  // --------------------------------------------------

  await db.orm.public.TimeCard
    .where((t) => t.id.isNotNull())
    .deleteAll();

  await db.orm.public.UserTicket
    .where((ut) => ut.userId.isNotNull())
    .deleteAll();

  await db.orm.public.UserProject
    .where((up) => up.userId.isNotNull())
    .deleteAll();

  await db.orm.public.Ticket
    .where((t) => t.id.isNotNull())
    .deleteAll();

  await db.orm.public.Project
    .where((p) => p.id.isNotNull())
    .deleteAll();

  await db.orm.public.User
    .where((u) => u.id.isNotNull())
    .deleteAll();

  // --------------------------------------------------
  // Users
  // --------------------------------------------------

  const users = await db.orm.public.User.createAll([
    {
      name: 'Kevin',
      email: 'kevin@sunroofco.com',
      costPerHour: 25,
      priceToCustomerPerHour: 50,
    },
    {
      name: 'John',
      email: 'john@sunroofco.com',
      costPerHour: 30,
      priceToCustomerPerHour: 60,
    },
    {
      name: 'Sarah',
      email: 'sarah@sunroofco.com',
      costPerHour: 28,
      priceToCustomerPerHour: 55,
    },
  ]);

  // --------------------------------------------------
  // Projects
  // --------------------------------------------------

  const projects = await db.orm.public.Project.createAll([
    {
      name: 'Acme HQ Roof Replacement',
      description:
        'Full roof replacement for Acme headquarters including membrane, insulation, and drainage work.',
      status: 'ACTIVE',
      startDate: '2026-09-15',
      endDate: '2026-11-15',
    },
    {
      name: 'Beacon Warehouse Repair',
      description:
        'Repair recurring leaks and damaged roof sections at the Beacon warehouse.',
      status: 'ACTIVE',
      startDate: '2026-10-01',
      endDate: '2026-10-31',
    },
    {
      name: 'Northstar Office Maintenance',
      description:
        'Preventative maintenance and inspection work for Northstar offices.',
      status: 'PLANNED',
      startDate: '2026-10-20',
      endDate: '2026-11-10',
    },
  ]);

  // --------------------------------------------------
  // Project assignments
  // --------------------------------------------------

  await db.orm.public.UserProject.createAll([
    {
      userId: users[0].id,
      projectId: projects[0].id,
    },
    {
      userId: users[1].id,
      projectId: projects[0].id,
    },
    {
      userId: users[2].id,
      projectId: projects[1].id,
    },
    {
      userId: users[0].id,
      projectId: projects[1].id,
    },
    {
      userId: users[1].id,
      projectId: projects[2].id,
    },
  ]);

  // --------------------------------------------------
  // Tickets
  // --------------------------------------------------

  const tickets = await db.orm.public.Ticket.createAll([
    // Acme HQ Roof Replacement
    {
      projectId: projects[0].id,
      title: 'Remove damaged TPO membrane',
      description:
        'Remove approximately 400 sq ft of damaged membrane and inspect insulation below for water intrusion.',
      status: 'COMPLETED',
      priority: 'HIGH',
      scheduledStart: '2026-09-22',
      scheduledEnd: '2026-09-23',
      completedAt: '2026-09-23',
      estimatedHours: 16,
    },
    {
      projectId: projects[0].id,
      title: 'Install replacement insulation',
      description:
        'Replace wet insulation discovered during membrane removal and prepare the surface for new TPO installation.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      scheduledStart: '2026-10-05',
      scheduledEnd: '2026-10-07',
      estimatedHours: 24,
    },
    {
      projectId: projects[0].id,
      title: 'Install new TPO membrane',
      description:
        'Install new TPO membrane over the prepared roof section and seal all perimeter details.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: '2026-10-08',
      scheduledEnd: '2026-10-10',
      estimatedHours: 20,
    },

    // Beacon Warehouse Repair
    {
      projectId: projects[1].id,
      title: 'Trace warehouse leak source',
      description:
        'Investigate leak path near the loading dock and identify failed flashing or membrane seams.',
      status: 'COMPLETED',
      priority: 'URGENT',
      scheduledStart: '2026-10-01',
      scheduledEnd: '2026-10-01',
      completedAt: '2026-10-01',
      estimatedHours: 6,
    },
    {
      projectId: projects[1].id,
      title: 'Replace damaged flashing',
      description:
        'Remove failed flashing near the loading dock and install replacement flashing.',
      status: 'BLOCKED',
      priority: 'HIGH',
      scheduledStart: '2026-10-06',
      scheduledEnd: '2026-10-06',
      estimatedHours: 8,
    },
    {
      projectId: projects[1].id,
      title: 'Repair membrane seams',
      description:
        'Reseal open membrane seams identified during the leak investigation.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: '2026-10-07',
      scheduledEnd: '2026-10-07',
      estimatedHours: 10,
    },

    // Northstar Office Maintenance
    {
      projectId: projects[2].id,
      title: 'Perform roof inspection',
      description:
        'Perform a full preventative roof inspection and document areas requiring maintenance.',
      status: 'BACKLOG',
      priority: 'MEDIUM',
      scheduledStart: '2026-10-20',
      scheduledEnd: '2026-10-20',
      estimatedHours: 8,
    },
    {
      projectId: projects[2].id,
      title: 'Clean roof drains',
      description:
        'Remove debris from roof drains and verify proper water flow.',
      status: 'BACKLOG',
      priority: 'LOW',
      scheduledStart: '2026-10-21',
      scheduledEnd: '2026-10-21',
      estimatedHours: 6,
    },
  ]);

  // --------------------------------------------------
  // Ticket assignments
  // --------------------------------------------------

  await db.orm.public.UserTicket.createAll([
    // Acme - damaged membrane
    {
      userId: users[0].id,
      ticketId: tickets[0].id,
    },
    {
      userId: users[1].id,
      ticketId: tickets[0].id,
    },

    // Acme - insulation
    {
      userId: users[0].id,
      ticketId: tickets[1].id,
    },
    {
      userId: users[1].id,
      ticketId: tickets[1].id,
    },

    // Acme - new membrane
    {
      userId: users[0].id,
      ticketId: tickets[2].id,
    },

    // Beacon - leak investigation
    {
      userId: users[2].id,
      ticketId: tickets[3].id,
    },

    // Beacon - flashing
    {
      userId: users[0].id,
      ticketId: tickets[4].id,
    },
    {
      userId: users[2].id,
      ticketId: tickets[4].id,
    },

    // Beacon - membrane seams
    {
      userId: users[0].id,
      ticketId: tickets[5].id,
    },

    // Northstar - inspection
    {
      userId: users[1].id,
      ticketId: tickets[6].id,
    },

    // Northstar - drains
    {
      userId: users[1].id,
      ticketId: tickets[7].id,
    },
  ]);

  // --------------------------------------------------
  // Time cards
  // --------------------------------------------------

  await db.orm.public.TimeCard.createAll([
    {
      userId: users[0].id,
      ticketId: tickets[0].id,
      date: '2026-09-22',
      hoursWorked: 8,
    },
    {
      userId: users[0].id,
      ticketId: tickets[0].id,
      date: '2026-09-23',
      hoursWorked: 8,
    },
    {
      userId: users[1].id,
      ticketId: tickets[0].id,
      date: '2026-09-22',
      hoursWorked: 7.5,
    },
    {
      userId: users[2].id,
      ticketId: tickets[3].id,
      date: '2026-10-01',
      hoursWorked: 6,
    },
    {
      userId: users[0].id,
      ticketId: tickets[1].id,
      date: '2026-10-05',
      hoursWorked: 8.25,
    },
  ]);

  console.log('Seed complete');
  process.exit();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});