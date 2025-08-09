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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = exports.ReportStatus = void 0;
const typeorm_1 = require("typeorm");
const sample_entity_1 = require("./sample.entity");
const test_template_entity_1 = require("./test-template.entity");
const user_entity_1 = require("./user.entity");
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["DRAFT"] = "draft";
    ReportStatus["IN_REVIEW"] = "in_review";
    ReportStatus["APPROVED"] = "approved";
    ReportStatus["PUBLISHED"] = "published";
    ReportStatus["REJECTED"] = "rejected";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
let Report = class Report {
    id;
    reportNumber;
    title;
    status;
    sample;
    sample_id;
    testTemplate;
    test_template_id;
    preparedBy;
    prepared_by_id;
    reviewedBy;
    reviewed_by_id;
    approvedBy;
    approved_by_id;
    reportData;
    executiveSummary;
    testProcedure;
    observations;
    recommendations;
    conclusion;
    attachments;
    testStartDate;
    testEndDate;
    reportDate;
    reviewDate;
    approvalDate;
    publishedDate;
    reviewComments;
    version;
    createdAt;
    updatedAt;
};
exports.Report = Report;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Report.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "reportNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReportStatus,
        default: ReportStatus.DRAFT
    }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sample_entity_1.Sample, (sample) => sample.reports),
    (0, typeorm_1.JoinColumn)({ name: 'sample_id' }),
    __metadata("design:type", sample_entity_1.Sample)
], Report.prototype, "sample", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "sample_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => test_template_entity_1.TestTemplate),
    (0, typeorm_1.JoinColumn)({ name: 'test_template_id' }),
    __metadata("design:type", test_template_entity_1.TestTemplate)
], Report.prototype, "testTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "test_template_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.preparedReports),
    (0, typeorm_1.JoinColumn)({ name: 'prepared_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Report.prototype, "preparedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "prepared_by_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'reviewed_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Report.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "reviewed_by_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'approved_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Report.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "approved_by_id", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], Report.prototype, "reportData", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "executiveSummary", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "testProcedure", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "observations", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "recommendations", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "conclusion", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], Report.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Report.prototype, "testStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Report.prototype, "testEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Report.prototype, "reportDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Report.prototype, "reviewDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Report.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Report.prototype, "publishedDate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "reviewComments", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Report.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Report.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Report.prototype, "updatedAt", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)('reports')
], Report);
//# sourceMappingURL=report.entity.js.map