import { DataSource } from "typeorm";

const ormConfigObj = 
  {
    name: 'default',
    type: 'postgres' as 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    seeds: ['dist/src/database/seeds/**/*.js'],
    factories: ['dist/src/database/factories/**/*.js'],
    migrations: ['dist/src/database/migrations/**/*.js'],
    entities: ['dist/src/database/entities/**/*.entity.js'],
    synchronize: false,
    migrationsRun: false,
    logging: false,
    cli: {
      entitiesDir: 'src/database/entities',
      migrationsDir: 'src/database/migrations',
    },
  };

  export const dataSource = new DataSource(ormConfigObj);