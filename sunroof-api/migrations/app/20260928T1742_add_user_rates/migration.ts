#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/31708ee3f670d3f57ae978761ce187e997be2262e2d81476990d5821480c1073/contract';
import endContract from '../../snapshots/31708ee3f670d3f57ae978761ce187e997be2262e2d81476990d5821480c1073/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/80aa7f6b2ddfdaa2f5e2f6ff9f5b06c315e6480a754e8c73be3b5ed4a64249fa/contract';
import startContract from '../../snapshots/80aa7f6b2ddfdaa2f5e2f6ff9f5b06c315e6480a754e8c73be3b5ed4a64249fa/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('costPerHour', 'float8', {
          notNull: true,
          default: lit(25),
          codecRef: { codecId: 'pg/float8@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('priceToCustomerPerHour', 'float8', {
          notNull: true,
          default: lit(50),
          codecRef: { codecId: 'pg/float8@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
