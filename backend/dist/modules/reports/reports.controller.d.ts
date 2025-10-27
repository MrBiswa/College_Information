import { ReportsService } from './reports.service';
import { ReportStatus } from '../../entities/report.entity';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    findAll(status?: ReportStatus, preparedById?: string): Promise<import("../../entities/report.entity").Report[]>;
    findOne(id: string): Promise<import("../../entities/report.entity").Report>;
    create(sampleId: string, preparedById: string): Promise<import("../../entities/report.entity").Report>;
    updateStatus(id: string, status: ReportStatus, userId?: string): Promise<import("../../entities/report.entity").Report>;
}
