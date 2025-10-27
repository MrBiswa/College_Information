import { IsString, IsEmail, IsEnum, IsOptional, IsArray, IsDateString } from 'class-validator';
import { ProductCategory } from '../../../entities/test-template.entity';

export class CreateSampleDto {
  @IsString()
  clientName: string;

  @IsEmail()
  clientEmail: string;

  @IsString()
  @IsOptional()
  clientPhone?: string;

  @IsString()
  @IsOptional()
  clientAddress?: string;

  @IsString()
  productName: string;

  @IsEnum(ProductCategory)
  productCategory: ProductCategory;

  @IsString()
  @IsOptional()
  productDescription?: string;

  @IsString()
  @IsOptional()
  manufacturerName?: string;

  @IsString()
  @IsOptional()
  modelNumber?: string;

  @IsString()
  @IsOptional()
  batchNumber?: string;

  @IsDateString()
  @IsOptional()
  manufacturingDate?: string;

  @IsArray()
  @IsOptional()
  requiredTests?: string[];

  @IsDateString()
  @IsOptional()
  expectedCompletionDate?: string;

  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}