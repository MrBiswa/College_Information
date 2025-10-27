import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SamplesService } from './samples.service';
import { SamplesController } from './samples.controller';
import { Sample } from '../../entities/sample.entity';
import { User } from '../../entities/user.entity';
import { TestTemplate } from '../../entities/test-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample, User, TestTemplate])],
  controllers: [SamplesController],
  providers: [SamplesService],
  exports: [SamplesService],
})
export class SamplesModule {}