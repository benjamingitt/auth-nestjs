import { Sequelize } from 'sequelize-typescript';
import { initialDbConfiguration } from './postgres.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '@app/constants';
import { User } from 'src/users/models/user.model';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = initialDbConfiguration.development;
          break;
        case TEST:
          config = initialDbConfiguration.test;
          break;
        case PRODUCTION:
          config = initialDbConfiguration.production;
          break;
        default:
          config = initialDbConfiguration.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
