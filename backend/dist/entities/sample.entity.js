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
exports.Sample = exports.ProductCategory = exports.SampleStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const report_entity_1 = require("./report.entity");
const test_template_entity_1 = require("./test-template.entity");
var SampleStatus;
(function (SampleStatus) {
    SampleStatus["SUBMITTED"] = "submitted";
    SampleStatus["ASSIGNED"] = "assigned";
    SampleStatus["IN_PROGRESS"] = "in_progress";
    SampleStatus["TESTING_COMPLETE"] = "testing_complete";
    SampleStatus["REPORT_GENERATED"] = "report_generated";
    SampleStatus["COMPLETED"] = "completed";
    SampleStatus["CANCELLED"] = "cancelled";
})(SampleStatus || (exports.SampleStatus = SampleStatus = {}));
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["LEATHER"] = "leather";
    ProductCategory["SHOE"] = "shoe";
    ProductCategory["ELECTRICAL"] = "electrical";
    ProductCategory["TOYS"] = "toys";
    ProductCategory["MECHANICAL"] = "mechanical";
    ProductCategory["THERMAL"] = "thermal";
    ProductCategory["ELECTRONICS"] = "electronics";
    ProductCategory["OTHER"] = "other";
})(ProductCategory || (exports.ProductCategory = ProductCategory = {}));
let Sample = class Sample {
    id;
    sampleNumber;
    clientName;
    clientEmail;
    clientPhone;
    clientAddress;
    productName;
    productCategory;
    productDescription;
    manufacturerName;
    modelNumber;
    batchNumber;
    manufacturingDate;
    requiredTests;
    status;
    expectedCompletionDate;
    actualCompletionDate;
    specialInstructions;
    notes;
    assignedEmployee;
    assigned_employee_id;
    testTemplate;
    test_template_id;
    reports;
    createdAt;
    updatedAt;
};
exports.Sample = Sample;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Sample.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sample.prototype, "sampleNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sample.prototype, "clientName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sample.prototype, "clientEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "clientPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "clientAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sample.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProductCategory
    }),
    __metadata("design:type", String)
], Sample.prototype, "productCategory", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "productDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "manufacturerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "modelNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "batchNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Sample.prototype, "manufacturingDate", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Sample.prototype, "requiredTests", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SampleStatus,
        default: SampleStatus.SUBMITTED
    }),
    __metadata("design:type", String)
], Sample.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Sample.prototype, "expectedCompletionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Sample.prototype, "actualCompletionDate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "specialInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.assignedSamples, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_employee_id' }),
    __metadata("design:type", user_entity_1.User)
], Sample.prototype, "assignedEmployee", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "assigned_employee_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => test_template_entity_1.TestTemplate, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'test_template_id' }),
    __metadata("design:type", test_template_entity_1.TestTemplate)
], Sample.prototype, "testTemplate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sample.prototype, "test_template_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_entity_1.Report, (report) => report.sample),
    __metadata("design:type", Array)
], Sample.prototype, "reports", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sample.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Sample.prototype, "updatedAt", void 0);
exports.Sample = Sample = __decorate([
    (0, typeorm_1.Entity)('samples')
], Sample);
//# sourceMappingURL=sample.entity.js.map