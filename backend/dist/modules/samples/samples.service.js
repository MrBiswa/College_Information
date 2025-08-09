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
exports.SamplesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sample_entity_1 = require("../../entities/sample.entity");
const user_entity_1 = require("../../entities/user.entity");
const test_template_entity_1 = require("../../entities/test-template.entity");
let SamplesService = class SamplesService {
    sampleRepository;
    userRepository;
    testTemplateRepository;
    constructor(sampleRepository, userRepository, testTemplateRepository) {
        this.sampleRepository = sampleRepository;
        this.userRepository = userRepository;
        this.testTemplateRepository = testTemplateRepository;
    }
    async create(createSampleDto) {
        const count = await this.sampleRepository.count();
        const sampleNumber = `LAB-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
        const sample = this.sampleRepository.create({
            ...createSampleDto,
            sampleNumber,
            manufacturingDate: createSampleDto.manufacturingDate ? new Date(createSampleDto.manufacturingDate) : null,
            expectedCompletionDate: createSampleDto.expectedCompletionDate ? new Date(createSampleDto.expectedCompletionDate) : null,
        });
        return this.sampleRepository.save(sample);
    }
    async findAll(filters) {
        const queryBuilder = this.sampleRepository.createQueryBuilder('sample')
            .leftJoinAndSelect('sample.assignedEmployee', 'employee')
            .leftJoinAndSelect('sample.testTemplate', 'template');
        if (filters?.status) {
            queryBuilder.andWhere('sample.status = :status', { status: filters.status });
        }
        if (filters?.assignedEmployeeId) {
            queryBuilder.andWhere('sample.assigned_employee_id = :employeeId', {
                employeeId: filters.assignedEmployeeId
            });
        }
        if (filters?.productCategory) {
            queryBuilder.andWhere('sample.productCategory = :category', {
                category: filters.productCategory
            });
        }
        return queryBuilder
            .orderBy('sample.createdAt', 'DESC')
            .getMany();
    }
    async findOne(id) {
        const sample = await this.sampleRepository.findOne({
            where: { id },
            relations: ['assignedEmployee', 'testTemplate', 'reports'],
        });
        if (!sample) {
            throw new common_1.NotFoundException(`Sample with ID ${id} not found`);
        }
        return sample;
    }
    async update(id, updateSampleDto) {
        const sample = await this.findOne(id);
        if (updateSampleDto.assignedEmployeeId) {
            const employee = await this.userRepository.findOne({
                where: { id: updateSampleDto.assignedEmployeeId }
            });
            if (!employee) {
                throw new common_1.NotFoundException('Employee not found');
            }
            sample.assignedEmployee = employee;
            sample.assigned_employee_id = employee.id;
            if (sample.status === sample_entity_1.SampleStatus.SUBMITTED) {
                sample.status = sample_entity_1.SampleStatus.ASSIGNED;
            }
        }
        if (updateSampleDto.testTemplateId) {
            const template = await this.testTemplateRepository.findOne({
                where: { id: updateSampleDto.testTemplateId }
            });
            if (!template) {
                throw new common_1.NotFoundException('Test template not found');
            }
            sample.testTemplate = template;
            sample.test_template_id = template.id;
        }
        Object.assign(sample, {
            ...updateSampleDto,
            manufacturingDate: updateSampleDto.manufacturingDate ? new Date(updateSampleDto.manufacturingDate) : sample.manufacturingDate,
            expectedCompletionDate: updateSampleDto.expectedCompletionDate ? new Date(updateSampleDto.expectedCompletionDate) : sample.expectedCompletionDate,
            actualCompletionDate: updateSampleDto.actualCompletionDate ? new Date(updateSampleDto.actualCompletionDate) : sample.actualCompletionDate,
        });
        return this.sampleRepository.save(sample);
    }
    async remove(id) {
        const sample = await this.findOne(id);
        if (sample.status === sample_entity_1.SampleStatus.IN_PROGRESS || sample.status === sample_entity_1.SampleStatus.TESTING_COMPLETE) {
            throw new common_1.BadRequestException('Cannot delete sample that is in progress or completed');
        }
        await this.sampleRepository.remove(sample);
    }
    async assignEmployee(sampleId, employeeId) {
        const sample = await this.findOne(sampleId);
        const employee = await this.userRepository.findOne({
            where: { id: employeeId }
        });
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        sample.assignedEmployee = employee;
        sample.assigned_employee_id = employee.id;
        sample.status = sample_entity_1.SampleStatus.ASSIGNED;
        return this.sampleRepository.save(sample);
    }
    async getEmployeeWorkload() {
        const employees = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.assignedSamples', 'sample')
            .where('user.role = :role', { role: 'employee' })
            .andWhere('user.isActive = :active', { active: true })
            .getMany();
        return employees.map(employee => ({
            id: employee.id,
            name: `${employee.firstName} ${employee.lastName}`,
            email: employee.email,
            testingCategories: employee.testingCategories,
            currentWorkload: employee.assignedSamples?.filter(sample => sample.status === sample_entity_1.SampleStatus.ASSIGNED ||
                sample.status === sample_entity_1.SampleStatus.IN_PROGRESS).length || 0,
            totalAssigned: employee.assignedSamples?.length || 0,
        }));
    }
    async getSamplesByEmployee(employeeId) {
        return this.sampleRepository.find({
            where: { assigned_employee_id: employeeId },
            relations: ['testTemplate'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateStatus(id, status) {
        const sample = await this.findOne(id);
        sample.status = status;
        if (status === sample_entity_1.SampleStatus.COMPLETED) {
            sample.actualCompletionDate = new Date();
        }
        return this.sampleRepository.save(sample);
    }
};
exports.SamplesService = SamplesService;
exports.SamplesService = SamplesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sample_entity_1.Sample)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(test_template_entity_1.TestTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SamplesService);
//# sourceMappingURL=samples.service.js.map