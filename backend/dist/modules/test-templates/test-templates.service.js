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
exports.TestTemplatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const test_template_entity_1 = require("../../entities/test-template.entity");
let TestTemplatesService = class TestTemplatesService {
    testTemplateRepository;
    constructor(testTemplateRepository) {
        this.testTemplateRepository = testTemplateRepository;
    }
    async create(createTestTemplateDto) {
        const template = this.testTemplateRepository.create(createTestTemplateDto);
        return this.testTemplateRepository.save(template);
    }
    async findAll(filters) {
        const queryBuilder = this.testTemplateRepository.createQueryBuilder('template');
        if (filters?.testingCategory) {
            queryBuilder.andWhere('template.testingCategory = :category', {
                category: filters.testingCategory
            });
        }
        if (filters?.productCategory) {
            queryBuilder.andWhere('template.productCategory = :product', {
                product: filters.productCategory
            });
        }
        if (filters?.isActive !== undefined) {
            queryBuilder.andWhere('template.isActive = :active', {
                active: filters.isActive
            });
        }
        return queryBuilder
            .orderBy('template.name', 'ASC')
            .getMany();
    }
    async findOne(id) {
        const template = await this.testTemplateRepository.findOne({
            where: { id },
        });
        if (!template) {
            throw new common_1.NotFoundException(`Test template with ID ${id} not found`);
        }
        return template;
    }
    async update(id, updateTestTemplateDto) {
        const template = await this.findOne(id);
        Object.assign(template, updateTestTemplateDto);
        return this.testTemplateRepository.save(template);
    }
    async remove(id) {
        const template = await this.findOne(id);
        await this.testTemplateRepository.remove(template);
    }
    async findByProductCategory(productCategory) {
        return this.testTemplateRepository.find({
            where: {
                productCategory,
                isActive: true
            },
            order: { name: 'ASC' },
        });
    }
    async createDefaultTemplates() {
        const defaultTemplates = this.getDefaultTemplates();
        for (const templateData of defaultTemplates) {
            const exists = await this.testTemplateRepository.findOne({
                where: {
                    name: templateData.name,
                    productCategory: templateData.productCategory
                }
            });
            if (!exists) {
                const template = this.testTemplateRepository.create(templateData);
                await this.testTemplateRepository.save(template);
            }
        }
    }
    getDefaultTemplates() {
        return [
            {
                name: 'Electrical TV Testing',
                description: 'Standard electrical safety and performance testing for televisions',
                testingCategory: test_template_entity_1.TestingCategory.ELECTRICAL,
                productCategory: test_template_entity_1.ProductCategory.ELECTRICAL,
                productSubCategory: 'TV',
                reportSections: [
                    {
                        id: '1',
                        title: 'Electrical Safety Tests',
                        order: 1,
                        isRequired: true,
                        parameters: [
                            {
                                id: '1-1',
                                name: 'Insulation Resistance',
                                description: 'Measurement of insulation resistance between live parts and accessible parts',
                                unit: 'MΩ',
                                minValue: 2,
                                acceptableLimits: '≥ 2 MΩ',
                                testMethod: 'IEC 60065',
                                equipment: 'Insulation Tester',
                                isRequired: true,
                            },
                            {
                                id: '1-2',
                                name: 'Earth Continuity',
                                description: 'Verification of earth continuity',
                                unit: 'Ω',
                                maxValue: 0.1,
                                acceptableLimits: '≤ 0.1 Ω',
                                testMethod: 'IEC 60065',
                                equipment: 'Low Resistance Ohmmeter',
                                isRequired: true,
                            },
                        ],
                    },
                    {
                        id: '2',
                        title: 'Performance Tests',
                        order: 2,
                        isRequired: true,
                        parameters: [
                            {
                                id: '2-1',
                                name: 'Power Consumption',
                                description: 'Measurement of power consumption',
                                unit: 'W',
                                testMethod: 'IEC 62087',
                                equipment: 'Power Meter',
                                isRequired: true,
                            },
                        ],
                    },
                ],
                complianceStandards: ['IEC 60065', 'IEC 62087', 'IS 13252'],
                equipmentRequired: ['Insulation Tester', 'Power Meter', 'Low Resistance Ohmmeter'],
                isActive: true,
                isCustom: false,
                estimatedDuration: 4,
                specialInstructions: 'Ensure TV is at room temperature before testing',
                samplePreparationSteps: [
                    'Visual inspection of the product',
                    'Check for any damage during transport',
                    'Allow product to acclimatize to room temperature',
                ],
                safetyRequirements: [
                    'Use appropriate PPE',
                    'Ensure proper earthing',
                    'Follow electrical safety protocols',
                ],
            },
            {
                name: 'Mechanical Toy Testing',
                description: 'Safety and mechanical testing for toys',
                testingCategory: test_template_entity_1.TestingCategory.MECHANICAL,
                productCategory: test_template_entity_1.ProductCategory.TOYS,
                reportSections: [
                    {
                        id: '1',
                        title: 'Physical and Mechanical Tests',
                        order: 1,
                        isRequired: true,
                        parameters: [
                            {
                                id: '1-1',
                                name: 'Drop Test',
                                description: 'Drop test from specified height',
                                unit: 'drops',
                                testMethod: 'IS 9873 Part 1',
                                equipment: 'Drop Test Apparatus',
                                isRequired: true,
                            },
                            {
                                id: '1-2',
                                name: 'Small Parts Test',
                                description: 'Test for small parts that could cause choking',
                                unit: 'pass/fail',
                                testMethod: 'IS 9873 Part 1',
                                equipment: 'Small Parts Cylinder',
                                isRequired: true,
                            },
                        ],
                    },
                ],
                complianceStandards: ['IS 9873 Part 1', 'EN 71-1'],
                equipmentRequired: ['Drop Test Apparatus', 'Small Parts Cylinder'],
                isActive: true,
                isCustom: false,
                estimatedDuration: 2,
            },
            {
                name: 'Leather Chemical Testing',
                description: 'Chemical analysis for leather products',
                testingCategory: test_template_entity_1.TestingCategory.MECHANICAL,
                productCategory: test_template_entity_1.ProductCategory.LEATHER,
                reportSections: [
                    {
                        id: '1',
                        title: 'Chemical Tests',
                        order: 1,
                        isRequired: true,
                        parameters: [
                            {
                                id: '1-1',
                                name: 'Chromium VI Content',
                                description: 'Determination of Chromium VI content',
                                unit: 'mg/kg',
                                maxValue: 3,
                                acceptableLimits: '≤ 3 mg/kg',
                                testMethod: 'ISO 17075',
                                equipment: 'UV-Vis Spectrophotometer',
                                isRequired: true,
                            },
                            {
                                id: '1-2',
                                name: 'Formaldehyde Content',
                                description: 'Determination of formaldehyde content',
                                unit: 'mg/kg',
                                maxValue: 75,
                                acceptableLimits: '≤ 75 mg/kg',
                                testMethod: 'ISO 17226-1',
                                equipment: 'UV-Vis Spectrophotometer',
                                isRequired: true,
                            },
                        ],
                    },
                ],
                complianceStandards: ['ISO 17075', 'ISO 17226-1'],
                equipmentRequired: ['UV-Vis Spectrophotometer', 'Sample Preparation Kit'],
                isActive: true,
                isCustom: false,
                estimatedDuration: 6,
            },
        ];
    }
};
exports.TestTemplatesService = TestTemplatesService;
exports.TestTemplatesService = TestTemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(test_template_entity_1.TestTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TestTemplatesService);
//# sourceMappingURL=test-templates.service.js.map