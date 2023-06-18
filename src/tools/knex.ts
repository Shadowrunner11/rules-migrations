import { CreateTable } from '../@types';

/**
 * Appends to table builder the creation of attributes created_at and updated_at
 * using timezone
 */
export function timestamps(table: CreateTable, timezone = true){
  table.timestamp('created_at', { useTz: timezone }).notNullable().defaultTo(new Date());
  table.timestamp('updated_at', { useTz: timezone }).notNullable().defaultTo(new Date());
}
