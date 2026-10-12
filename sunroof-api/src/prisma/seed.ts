import { db } from './db.js';

async function main() {
  // Anchor the demo to the day it is seeded so reports show recent activity.
  const today = new Date();
  const dateFromToday = (days: number): string => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
      startDate: dateFromToday(-14),
      endDate: dateFromToday(40),
    },
    {
      name: 'Beacon Warehouse Repair',
      description:
        'Repair recurring leaks and damaged roof sections at the Beacon warehouse.',
      status: 'ACTIVE',
      startDate: dateFromToday(-3),
      endDate: dateFromToday(25),
    },
    {
      name: 'Northstar Office Maintenance',
      description:
        'Preventative maintenance and inspection work for Northstar offices.',
      status: 'PLANNED',
      startDate: dateFromToday(14),
      endDate: dateFromToday(35),
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
      scheduledStart: dateFromToday(-5),
      scheduledEnd: dateFromToday(-4),
      completedAt: dateFromToday(-4),
      estimatedHours: 16,
    },
    {
      projectId: projects[0].id,
      title: 'Install replacement insulation',
      description:
        'Replace wet insulation discovered during membrane removal and prepare the surface for new TPO installation.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      scheduledStart: dateFromToday(-1),
      scheduledEnd: dateFromToday(1),
      estimatedHours: 24,
    },
    {
      projectId: projects[0].id,
      title: 'Install new TPO membrane',
      description:
        'Install new TPO membrane over the prepared roof section and seal all perimeter details.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: dateFromToday(2),
      scheduledEnd: dateFromToday(4),
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
      scheduledStart: dateFromToday(-3),
      scheduledEnd: dateFromToday(-3),
      completedAt: dateFromToday(-3),
      estimatedHours: 6,
    },
    {
      projectId: projects[1].id,
      title: 'Replace damaged flashing',
      description:
        'Remove failed flashing near the loading dock and install replacement flashing.',
      status: 'BLOCKED',
      priority: 'HIGH',
      scheduledStart: dateFromToday(0),
      scheduledEnd: dateFromToday(0),
      estimatedHours: 8,
    },
    {
      projectId: projects[1].id,
      title: 'Repair membrane seams',
      description:
        'Reseal open membrane seams identified during the leak investigation.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: dateFromToday(1),
      scheduledEnd: dateFromToday(1),
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
      scheduledStart: dateFromToday(14),
      scheduledEnd: dateFromToday(14),
      estimatedHours: 8,
    },
    {
      projectId: projects[2].id,
      title: 'Clean roof drains',
      description:
        'Remove debris from roof drains and verify proper water flow.',
      status: 'BACKLOG',
      priority: 'LOW',
      scheduledStart: dateFromToday(15),
      scheduledEnd: dateFromToday(15),
      estimatedHours: 6,
    },

    // Upcoming work over the next month.
    {
      projectId: projects[0].id,
      title: 'Inspect roof perimeter flashing',
      description:
        'Inspect perimeter flashing and seal gaps before the next installation phase.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: dateFromToday(10),
      scheduledEnd: dateFromToday(10),
      estimatedHours: 8,
    },
    {
      projectId: projects[1].id,
      title: 'Test loading dock roof drainage',
      description:
        'Test drainage near the loading dock and document any remaining ponding.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: dateFromToday(17),
      scheduledEnd: dateFromToday(17),
      estimatedHours: 6,
    },
    {
      projectId: projects[2].id,
      title: 'Seal roof penetrations',
      description:
        'Seal maintenance areas identified during the preventative roof inspection.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: dateFromToday(24),
      scheduledEnd: dateFromToday(24),
      estimatedHours: 8,
    },
    {
      projectId: projects[0].id,
      title: 'Perform final membrane quality inspection',
      description:
        'Inspect membrane seams and perimeter details before project handover.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: dateFromToday(27),
      scheduledEnd: dateFromToday(27),
      estimatedHours: 8,
    },
    {
      projectId: projects[2].id,
      title: 'Verify roof drain repairs',
      description:
        'Verify drain flow and confirm maintenance repairs are complete.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: dateFromToday(29),
      scheduledEnd: dateFromToday(29),
      estimatedHours: 6,
    },
    {
      projectId: projects[0].id,
      title: 'Complete roof handover walkthrough',
      description:
        'Walk the completed roof with the customer and document final acceptance items.',
      status: 'SCHEDULED',
      priority: 'MEDIUM',
      scheduledStart: dateFromToday(31),
      scheduledEnd: dateFromToday(31),
      estimatedHours: 4,
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

    // Upcoming scheduled work
    {
      userId: users[0].id,
      ticketId: tickets[8].id,
    },
    {
      userId: users[2].id,
      ticketId: tickets[9].id,
    },
    {
      userId: users[1].id,
      ticketId: tickets[10].id,
    },
    {
      userId: users[0].id,
      ticketId: tickets[11].id,
    },
    {
      userId: users[1].id,
      ticketId: tickets[12].id,
    },
    {
      userId: users[0].id,
      ticketId: tickets[13].id,
    },
  ]);

  // --------------------------------------------------
  // Time cards within the default seven-day report range.
  // Use past days because the labor report excludes its end date.
  // --------------------------------------------------

  await db.orm.public.TimeCard.createAll([
    {
      userId: users[0].id,
      ticketId: tickets[0].id,
      date: dateFromToday(-5),
      hoursWorked: 8,
    },
    {
      userId: users[0].id,
      ticketId: tickets[0].id,
      date: dateFromToday(-4),
      hoursWorked: 8,
    },
    {
      userId: users[1].id,
      ticketId: tickets[0].id,
      date: dateFromToday(-5),
      hoursWorked: 7.5,
    },
    {
      userId: users[2].id,
      ticketId: tickets[3].id,
      date: dateFromToday(-3),
      hoursWorked: 6,
    },
    {
      userId: users[0].id,
      ticketId: tickets[1].id,
      date: dateFromToday(-1),
      hoursWorked: 8,
    },
  ]);

  console.log('Seed complete');
  process.exit();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});