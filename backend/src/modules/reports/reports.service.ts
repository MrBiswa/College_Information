import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report, ReportStatus } from '../../entities/report.entity';
import { Sample } from '../../entities/sample.entity';
import { User } from '../../entities/user.entity';
import { TestTemplate } from '../../entities/test-template.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(Sample)
    private sampleRepository: Repository<Sample>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TestTemplate)
    private testTemplateRepository: Repository<TestTemplate>,
  ) {}

  async findAll(filters?: {
    status?: ReportStatus;
    preparedById?: string;
  }): Promise<Report[]> {
    const queryBuilder = this.reportRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.sample', 'sample')
      .leftJoinAndSelect('report.preparedBy', 'preparedBy')
      .leftJoinAndSelect('report.testTemplate', 'testTemplate');

    if (filters?.status) {
      queryBuilder.andWhere('report.status = :status', { status: filters.status });
    }

    if (filters?.preparedById) {
      queryBuilder.andWhere('report.prepared_by_id = :preparedById', { 
        preparedById: filters.preparedById 
      });
    }

    return queryBuilder
      .orderBy('report.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['sample', 'preparedBy', 'reviewedBy', 'approvedBy', 'testTemplate'],
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async create(sampleId: string, preparedById: string): Promise<Report> {
    const sample = await this.sampleRepository.findOne({
      where: { id: sampleId },
      relations: ['testTemplate'],
    });

    if (!sample) {
      throw new NotFoundException('Sample not found');
    }

    const preparedBy = await this.userRepository.findOne({
      where: { id: preparedById }
    });

    if (!preparedBy) {
      throw new NotFoundException('User not found');
    }

    // Generate report number
    const count = await this.reportRepository.count();
    const reportNumber = `RPT-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const report = this.reportRepository.create({
      reportNumber,
      title: `Test Report for ${sample.productName}`,
      sample_id: sample.id,
      test_template_id: sample.test_template_id,
      prepared_by_id: preparedById,
      reportData: [],
      status: ReportStatus.DRAFT,
    });

    return this.reportRepository.save(report);
  }

  async updateStatus(id: string, status: ReportStatus, userId?: string): Promise<Report> {
    const report = await this.findOne(id);
    report.status = status;

    if (status === ReportStatus.IN_REVIEW && userId) {
      report.reviewed_by_id = userId;
      report.reviewDate = new Date();
    }

    if (status === ReportStatus.APPROVED && userId) {
      report.approved_by_id = userId;
      report.approvalDate = new Date();
    }

    if (status === ReportStatus.PUBLISHED) {
      report.publishedDate = new Date();
    }

    return this.reportRepository.save(report);
  }
}