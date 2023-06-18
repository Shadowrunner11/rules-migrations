import 'dotenv/config';
import { Knex } from 'knex';

type Config = Knex.Config
type ConectionConfig = Knex.StaticConnectionConfig

const globalConfig : Config = {
  migrations: {
    directory:'src/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: 'src/seeds'
  }
}

const withGLobalConfig : (specificConfig: Config)=> Config = (specificConfig: Config ) => ({
  ...globalConfig,
  ...specificConfig
})

const connectionDefaultConfig : ConectionConfig = {
  user: process.env.USER_POSTGRES,
  password: process.env.PASSWORD_POSTGRES
}

const config: { [key: string]: Config } = {
  local:withGLobalConfig({
    client: 'sqlite3',
    connection: {
      filename: './local.sqlite3'
    }
  }),

  development: withGLobalConfig({
    client: 'postgresql',
    connection: {
      database: 'rules_dev',
     ...connectionDefaultConfig
    },
    pool: {
      min: 2,
      max: 10
    }
  }),

  staging:withGLobalConfig({
    client: 'postgresql',
    connection: {
      database: 'rules_test',
      ...connectionDefaultConfig
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }),

  production: withGLobalConfig({
    client: 'postgresql',
    connection: {
      database: 'rules_prod',
      ...connectionDefaultConfig
    },
    pool: {
      min: 2,
      max: 10
    }
  })
};

module.exports = config;
