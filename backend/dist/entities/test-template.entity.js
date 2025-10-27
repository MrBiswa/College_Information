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
exports.TestTemplate = exports.ProductCategory = exports.TestingCategory = void 0;
const typeorm_1 = require("typeorm");
const sample_entity_1 = require("./sample.entity");
var TestingCategory;
(function (TestingCategory) {
    TestingCategory["ELECTRICAL"] = "electrical";
    TestingCategory["MECHANICAL"] = "mechanical";
    TestingCategory["THERMAL"] = "thermal";
    TestingCategory["FLUID_FLOW"] = "fluid_flow";
    TestingCategory["ELECTRO_TECHNICAL"] = "electro_technical";
})(TestingCategory || (exports.TestingCategory = TestingCategory = {}));
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
let TestTemplate = class TestTemplate {
    id;
    name;
    description;
    testingCategory;
    productCategory;
    productSubCategory;
    reportSections;
    complianceStandards;
    equipmentRequired;
    isActive;
    isCustom;
    estimatedDuration;
    specialInstructions;
    samplePreparationSteps;
    safetyRequirements;
    samples;
    createdAt;
    updatedAt;
};
exports.TestTemplate = TestTemplate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TestTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TestTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], TestTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TestingCategory
    }),
    __metadata("design:type", String)
], TestTemplate.prototype, "testingCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProductCategory
    }),
    __metadata("design:type", String)
], TestTemplate.prototype, "productCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TestTemplate.prototype, "productSubCategory", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], TestTemplate.prototype, "reportSections", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], TestTemplate.prototype, "complianceStandards", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], TestTemplate.prototype, "equipmentRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], TestTemplate.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TestTemplate.prototype, "isCustom", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TestTemplate.prototype, "estimatedDuration", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], TestTemplate.prototype, "specialInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], TestTemplate.prototype, "samplePreparationSteps", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], TestTemplate.prototype, "safetyRequirements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sample_entity_1.Sample, (sample) => sample.testTemplate),
    __metadata("design:type", Array)
], TestTemplate.prototype, "samples", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TestTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TestTemplate.prototype, "updatedAt", void 0);
exports.TestTemplate = TestTemplate = __decorate([
    (0, typeorm_1.Entity)('test_templates')
], TestTemplate);
//# sourceMappingURL=test-template.entity.js.map