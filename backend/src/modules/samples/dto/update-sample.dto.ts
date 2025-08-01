import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { CreateSampleDto } from './create-sample.dto';
import { SampleStatus } from '../../../entities/sample.entity';

export class UpdateSampleDto extends PartialType(CreateSampleDto) {
  @IsEnum(SampleStatus)
  @IsOptional()
  status?: SampleStatus;

  @IsString()
  @IsOptional()
  assignedEmployeeId?: string;

  @IsString()
  @IsOptional()
  testTemplateId?: string;

  @IsDateString()
  @IsOptional()
  actualCompletionDate?: string;
}