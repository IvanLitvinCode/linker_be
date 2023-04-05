import { ConnectionOptions } from 'typeorm';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres_db',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'linker_root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'linker',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default ormconfig;
