#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/37aa87ed8e941e6f1a4d76d7da9934548eb9a8975bf63eaad3d33f2db1f4415a/contract';
import startContract from '../../snapshots/37aa87ed8e941e6f1a4d76d7da9934548eb9a8975bf63eaad3d33f2db1f4415a/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f9ffe47ab81c36d57cbda9f696c9d0134850bb1fab4e8d16f64fb3ac167270dc/contract';
import endContractJson from '../../snapshots/f9ffe47ab81c36d57cbda9f696c9d0134850bb1fab4e8d16f64fb3ac167270dc/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  placeholder,
} from '@prisma/orm-postgres/migration';

import postgresAdapter from '@prisma/orm-postgres/adapter/runtime';
import { sql } from '@prisma/orm-postgres/builder/runtime';
import { createExecutionContext, createSqlExecutionStack } from '@prisma/orm-postgres/family-runtime';
import postgresTarget, { PostgresContractSerializer } from '@prisma/orm-postgres/target/runtime';

const endContract = new PostgresContractSerializer().deserializeContract<End>(endContractJson);
const stack = createSqlExecutionStack({ target: postgresTarget, adapter: postgresAdapter });

const db = sql<End>({
  context: createExecutionContext({ contract: endContract, stack }),
  rawCodecInferer: stack.adapter.rawCodecInferer,
});

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContractJson;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('costPerHour', 'float8', {
          codecRef: { codecId: 'pg/float8@1' },
        }),
      }),
      this.dataTransform(endContract, 'backfill-user-costPerHour', {
        check: () =>
          db.public.user
            .select('id')
            .where((f, fns) => fns.eq(f.costPerHour, null))
            .limit(1),
        run: () => 
          db.public.user
          .update({ costPerHour: 25 })
          .where((f, fns) => fns.eq(f.costPerHour, null)),
      }),
      this.setNotNull({
        schema: 'public',
        table: 'user',
        column: 'costPerHour',
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('priceToCustomerPerHour', 'float8', {
          codecRef: { codecId: 'pg/float8@1' },
        }),
      }),
      this.dataTransform(endContract, 'backfill-user-priceToCustomerPerHour', {
         check: () =>
          db.public.user
            .select('id')
            .where((f, fns) => fns.eq(f.priceToCustomerPerHour, null))
            .limit(1),
        run: () => 
          db.public.user
          .update({ priceToCustomerPerHour: 50 })
          .where((f, fns) => fns.eq(f.priceToCustomerPerHour, null)),
      }),
      this.setNotNull({
        schema: 'public',
        table: 'user',
        column: 'priceToCustomerPerHour',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
