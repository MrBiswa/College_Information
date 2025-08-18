import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Sample } from '../entities/sample.entity';
import { TestTemplate } from '../entities/test-template.entity';
import { Report } from '../entities/report.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port:  Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'lab_testing_db',
  entities: [User, Sample, TestTemplate, Report],
  synchronize: process.env.NODE_ENV !== 'production', // Don't use in production
  logging: process.env.NODE_ENV === 'development',
};