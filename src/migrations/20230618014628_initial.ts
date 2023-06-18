/* eslint-disable require-jsdoc */
import type { Knex } from 'knex';
import { CreateTable } from '../@types';
import { timestamps } from '../tools';

const languagesTable = (table: CreateTable) => {
  table.bigIncrements('id').notNullable().primary();
  table.text('alias').notNullable();
  table.text('name').notNullable();
}

const qualityProfilesTable = (table: CreateTable) => {
  timestamps(table)
  table.bigIncrements('id').notNullable().primary();
  table.text('key').notNullable();
  table.text('name').notNullable();
  table.bigint('language_id').notNullable();
  table.boolean('isDefault').notNullable();

  table.foreign('language_id').references('id').inTable('languages');
}

const rulesTable = (table: CreateTable) => {
  table.bigIncrements('id').notNullable().primary();
  table.text('key').notNullable();
  table.bigint('language_id').notNullable();
  table.text('name').notNullable();
  table.text('htmlDesc').notNullable();
  table.text('severity').notNullable();
  table.text('type').notNullable();

  table.foreign('language_id').references('id').inTable('languages');

}

const statusTable = (table: CreateTable) => {
  timestamps(table)
  table.bigIncrements('id').notNullable().primary();
  table.boolean('isActive').notNullable();
  table.boolean('isActiveSonar').notNullable();
  table.bigInteger('qualityProfile_id').notNullable();

  table.foreign('qualityProfile_id').references('id').inTable('qualityprofiles')
}


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('languages', languagesTable)
    .createTable('qualityprofiles', qualityProfilesTable)
    .createTable('rules', rulesTable)
    .createTable('status', statusTable)
}

const tables = ['languages', 'qualityprofiles', 'rules', 'status']

export async function down(knex: Knex): Promise<void> {
  let { schema } =  knex

  for(const tableName in tables)
    schema = schema.dropTable(tableName)

  return schema
}

