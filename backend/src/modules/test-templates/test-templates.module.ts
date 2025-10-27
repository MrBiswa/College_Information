import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestTemplatesService } from './test-templates.service';
import { TestTemplatesController } from './test-templates.controller';
import { TestTemplate } from '../../entities/test-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestTemplate])],
  controllers: [TestTemplatesController],
  providers: [TestTemplatesService],
  exports: [TestTemplatesService],
})
export class TestTemplatesModule {}