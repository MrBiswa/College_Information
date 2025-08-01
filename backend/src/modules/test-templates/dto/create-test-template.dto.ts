import { IsString, IsEnum, IsOptional, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { TestingCategory, ProductCategory } from '../../../entities/test-template.entity';
import { ReportSection } from '../../../entities/test-template.entity';

export class CreateTestTemplateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TestingCategory)
  testingCategory: TestingCategory;

  @IsEnum(ProductCategory)
  productCategory: ProductCategory;

  @IsString()
  @IsOptional()
  productSubCategory?: string;

  @IsArray()
  reportSections: ReportSection[];

  @IsArray()
  @IsOptional()
  complianceStandards?: string[];

  @IsArray()
  @IsOptional()
  equipmentRequired?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isCustom?: boolean;

  @IsNumber()
  @IsOptional()
  estimatedDuration?: number;

  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @IsArray()
  @IsOptional()
  samplePreparationSteps?: string[];

  @IsArray()
  @IsOptional()
  safetyRequirements?: string[];
}