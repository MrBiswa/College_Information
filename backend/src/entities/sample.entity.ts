import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

export enum SampleStatus {
  SUBMITTED = 'submitted',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  TESTING_COMPLETE = 'testing_complete',
  REPORT_GENERATED = 'report_generated',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
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

@Entity('samples')
export class Sample {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sampleNumber: string;

  @Column()
  clientName: string;

  @Column()
  clientEmail: string;

  @Column({ nullable: true })
  clientPhone: string;

  @Column({ nullable: true })
  clientAddress: string;

  @Column()
  productName: string;

  @Column({
    type: 'enum',
    enum: ProductCategory
  })
  productCategory: ProductCategory;

  @Column('text', { nullable: true })
  productDescription: string;

  @Column({ nullable: true })
  manufacturerName: string;

  @Column({ nullable: true })
  modelNumber: string;

  @Column({ nullable: true })
  batchNumber: string;

  @Column({ type: 'date', nullable: true })
  manufacturingDate: Date;

  @Column('simple-array', { nullable: true })
  requiredTests: string[];

  @Column({
    type: 'enum',
    enum: SampleStatus,
    default: SampleStatus.SUBMITTED
  })
  status: SampleStatus;

  @Column({ type: 'date', nullable: true })
  expectedCompletionDate: Date;

  @Column({ type: 'date', nullable: true })
  actualCompletionDate: Date;

  @Column('text', { nullable: true })
  specialInstructions: string;

  @Column('text', { nullable: true })
  notes: string;

  @ManyToOne(() => 'User', 'assignedSamples', { nullable: true })
  @JoinColumn({ name: 'assigned_employee_id' })
  assignedEmployee: any;

  @Column({ nullable: true })
  assigned_employee_id: string;

  @ManyToOne(() => 'TestTemplate', { nullable: true })
  @JoinColumn({ name: 'test_template_id' })
  testTemplate: any;

  @Column({ nullable: true })
  test_template_id: string;

  @OneToMany(() => 'Report', 'sample')
  reports: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}