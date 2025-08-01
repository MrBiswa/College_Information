import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

export enum TestingCategory {
  ELECTRICAL = 'electrical',
  MECHANICAL = 'mechanical',
  THERMAL = 'thermal',
  FLUID_FLOW = 'fluid_flow',
  ELECTRO_TECHNICAL = 'electro_technical'
}

export enum ProductCategory {
  LEATHER = 'leather',
  SHOE = 'shoe',
  ELECTRICAL = 'electrical',
  TOYS = 'toys',
  MECHANICAL = 'mechanical',
  THERMAL = 'thermal',
  ELECTRONICS = 'electronics',
  OTHER = 'other'
}

export interface TestParameter {
  id: string;
  name: string;
  description: string;
  unit: string;
  minValue?: number;
  maxValue?: number;
  acceptableLimits?: string;
  testMethod: string;
  equipment: string;
  isRequired: boolean;
  isCustom?: boolean;
}

export interface ReportSection {
  id: string;
  title: string;
  order: number;
  parameters: TestParameter[];
  isRequired: boolean;
  isCustom?: boolean;
}

@Entity('test_templates')
export class TestTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TestingCategory
  })
  testingCategory: TestingCategory;

  @Column({
    type: 'enum',
    enum: ProductCategory
  })
  productCategory: ProductCategory;

  @Column({ nullable: true })
  productSubCategory: string;

  @Column('json')
  reportSections: ReportSection[];

  @Column('json', { nullable: true })
  complianceStandards: string[];

  @Column('json', { nullable: true })
  equipmentRequired: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isCustom: boolean;

  @Column({ nullable: true })
  estimatedDuration: number; // in hours

  @Column('text', { nullable: true })
  specialInstructions: string;

  @Column('json', { nullable: true })
  samplePreparationSteps: string[];

  @Column('json', { nullable: true })
  safetyRequirements: string[];

  @OneToMany(() => 'Sample', 'testTemplate')
  samples: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}