"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("../../entities/report.entity");
const sample_entity_1 = require("../../entities/sample.entity");
const user_entity_1 = require("../../entities/user.entity");
const test_template_entity_1 = require("../../entities/test-template.entity");
let ReportsService = class ReportsService {
    reportRepository;
    sampleRepository;
    userRepository;
    testTemplateRepository;
    constructor(reportRepository, sampleRepository, userRepository, testTemplateRepository) {
        this.reportRepository = reportRepository;
        this.sampleRepository = sampleRepository;
        this.userRepository = userRepository;
        this.testTemplateRepository = testTemplateRepository;
    }
    async findAll(filters) {
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
    async findOne(id) {
        const report = await this.reportRepository.findOne({
            where: { id },
            relations: ['sample', 'preparedBy', 'reviewedBy', 'approvedBy', 'testTemplate'],
        });
        if (!report) {
            throw new common_1.NotFoundException(`Report with ID ${id} not found`);
        }
        return report;
    }
    async create(sampleId, preparedById) {
        const sample = await this.sampleRepository.findOne({
            where: { id: sampleId },
            relations: ['testTemplate'],
        });
        if (!sample) {
            throw new common_1.NotFoundException('Sample not found');
        }
        const preparedBy = await this.userRepository.findOne({
            where: { id: preparedById }
        });
        if (!preparedBy) {
            throw new common_1.NotFoundException('User not found');
        }
        const count = await this.reportRepository.count();
        const reportNumber = `RPT-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
        const report = this.reportRepository.create({
            reportNumber,
            title: `Test Report for ${sample.productName}`,
            sample_id: sample.id,
            test_template_id: sample.test_template_id,
            prepared_by_id: preparedById,
            reportData: [],
            status: report_entity_1.ReportStatus.DRAFT,
        });
        return this.reportRepository.save(report);
    }
    async updateStatus(id, status, userId) {
        const report = await this.findOne(id);
        report.status = status;
        if (status === report_entity_1.ReportStatus.IN_REVIEW && userId) {
            report.reviewed_by_id = userId;
            report.reviewDate = new Date();
        }
        if (status === report_entity_1.ReportStatus.APPROVED && userId) {
            report.approved_by_id = userId;
            report.approvalDate = new Date();
        }
        if (status === report_entity_1.ReportStatus.PUBLISHED) {
            report.publishedDate = new Date();
        }
        return this.reportRepository.save(report);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __param(1, (0, typeorm_1.InjectRepository)(sample_entity_1.Sample)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(test_template_entity_1.TestTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map