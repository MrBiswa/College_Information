import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from '../../entities/report.entity';
import { Sample } from '../../entities/sample.entity';
import { User } from '../../entities/user.entity';
import { TestTemplate } from '../../entities/test-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Sample, User, TestTemplate])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}