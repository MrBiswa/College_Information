import { Repository } from 'typeorm';
import { Report, ReportStatus } from '../../entities/report.entity';
import { Sample } from '../../entities/sample.entity';
import { User } from '../../entities/user.entity';
import { TestTemplate } from '../../entities/test-template.entity';
export declare class ReportsService {
    private reportRepository;
    private sampleRepository;
    private userRepository;
    private testTemplateRepository;
    constructor(reportRepository: Repository<Report>, sampleRepository: Repository<Sample>, userRepository: Repository<User>, testTemplateRepository: Repository<TestTemplate>);
    findAll(filters?: {
        status?: ReportStatus;
        preparedById?: string;
    }): Promise<Report[]>;
    findOne(id: string): Promise<Report>;
    create(sampleId: string, preparedById: string): Promise<Report>;
    updateStatus(id: string, status: ReportStatus, userId?: string): Promise<Report>;
}
