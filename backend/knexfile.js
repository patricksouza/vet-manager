// Arquivo de Configuração do banco de dados

module.exports = {

  // Ambiente de desenvolvimento (O banco que está sendo utilizado é o SQLITE, pois estamos em desenvolvimento,
  // no ambiente de produção será utilizado o banco PostgreSQL)
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds:{
      directory:__dirname + '/src/database/seeds'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'getstaovet',
      user:     'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
