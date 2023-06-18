import { CreateTable } from '../@types';

export const timestamps = (table: CreateTable) => {
  table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(new Date());
  table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(new Date());
}
