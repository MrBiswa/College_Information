import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum ReportStatus {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  REJECTED = 'rejected'
}

export interface TestResult {
  parameterId: string;
  parameterName: string;
  measuredValue: string | number;
  unit: string;
  acceptableLimits?: string;
  result: 'PASS' | 'FAIL' | 'N/A';
  remarks?: string;
  testDate: Date;
  equipment: string;
  testMethod: string;
}

export interface ReportData {
  sectionId: string;
  sectionTitle: string;
  results: TestResult[];
  observations?: string;
  recommendations?: string;
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reportNumber: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.DRAFT
  })
  status: ReportStatus;

  @ManyToOne(() => 'Sample', 'reports')
  @JoinColumn({ name: 'sample_id' })
  sample: any;

  @Column()
  sample_id: string;

  @ManyToOne(() => 'TestTemplate')
  @JoinColumn({ name: 'test_template_id' })
  testTemplate: any;

  @Column()
  test_template_id: string;

  @ManyToOne(() => 'User', 'preparedReports')
  @JoinColumn({ name: 'prepared_by_id' })
  preparedBy: any;

  @Column()
  prepared_by_id: string;

  @ManyToOne(() => 'User', { nullable: true })
  @JoinColumn({ name: 'reviewed_by_id' })
  reviewedBy: any;

  @Column({ nullable: true })
  reviewed_by_id: string;

  @ManyToOne(() => 'User', { nullable: true })
  @JoinColumn({ name: 'approved_by_id' })
  approvedBy: any;

  @Column({ nullable: true })
  approved_by_id: string;

  @Column('json')
  reportData: ReportData[];

  @Column('text', { nullable: true })
  executiveSummary: string;

  @Column('text', { nullable: true })
  testProcedure: string;

  @Column('text', { nullable: true })
  observations: string;

  @Column('text', { nullable: true })
  recommendations: string;

  @Column('text', { nullable: true })
  conclusion: string;

  @Column('json', { nullable: true })
  attachments: string[];

  @Column({ type: 'date', nullable: true })
  testStartDate: Date;

  @Column({ type: 'date', nullable: true })
  testEndDate: Date;

  @Column({ type: 'date', nullable: true })
  reportDate: Date;

  @Column({ type: 'date', nullable: true })
  reviewDate: Date;

  @Column({ type: 'date', nullable: true })
  approvalDate: Date;

  @Column({ type: 'date', nullable: true })
  publishedDate: Date;

  @Column('text', { nullable: true })
  reviewComments: string;

  @Column({ default: 1 })
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}