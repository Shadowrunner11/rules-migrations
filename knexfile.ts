import { Knex } from 'knex';

type Config = Knex.Config

const globalConfig : Config = {
  migrations: {
    directory:'src/migrations'
  },
  seeds: {
    directory: 'src/seeds'
  }
}

const withGLobalConfig : (specificConfig: Config)=> Config = (specificConfig: Config ) => ({
  ...globalConfig,
  ...specificConfig
})

const config: { [key: string]: Config } = {
  local:withGLobalConfig({
    client: 'sqlite3',
    connection: {
      filename: './local.sqlite3'
    }
  }),

  development: withGLobalConfig({
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  }),

  staging:withGLobalConfig({
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
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
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  })
};

module.exports = config;
