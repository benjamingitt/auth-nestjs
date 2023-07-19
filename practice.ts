import { Sequelize } from 'sequelize-typescript';
import { join } from 'path';
import * as dotenv from 'dotenv';

import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration-lts';
import { Dialect } from 'sequelize';
import { User } from 'src/users/models/user.model';
dotenv.config();
console.log(process.env.DB_USER);
const bootstrap = async () => {
  const sequelize: Sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect,
    models: [User],
    logging: false,
  });
  try {
    const result = await SequelizeTypescriptMigration.makeMigration(sequelize, {
      outDir: join(__dirname, 'src/database/migrations'),
      migrationName: 'init',
      useSnakeCase: false,
    });
  } catch (e) {
    console.log(e);
  }
};

bootstrap();
