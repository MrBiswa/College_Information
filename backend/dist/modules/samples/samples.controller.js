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
exports.SamplesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const samples_service_1 = require("./samples.service");
const create_sample_dto_1 = require("./dto/create-sample.dto");
const update_sample_dto_1 = require("./dto/update-sample.dto");
const sample_entity_1 = require("../../entities/sample.entity");
let SamplesController = class SamplesController {
    samplesService;
    constructor(samplesService) {
        this.samplesService = samplesService;
    }
    create(createSampleDto) {
        return this.samplesService.create(createSampleDto);
    }
    findAll(status, assignedEmployeeId, productCategory) {
        return this.samplesService.findAll({
            status,
            assignedEmployeeId,
            productCategory,
        });
    }
    getEmployeeWorkload() {
        return this.samplesService.getEmployeeWorkload();
    }
    getSamplesByEmployee(employeeId) {
        return this.samplesService.getSamplesByEmployee(employeeId);
    }
    findOne(id) {
        return this.samplesService.findOne(id);
    }
    update(id, updateSampleDto) {
        return this.samplesService.update(id, updateSampleDto);
    }
    assignEmployee(sampleId, employeeId) {
        return this.samplesService.assignEmployee(sampleId, employeeId);
    }
    updateStatus(id, status) {
        return this.samplesService.updateStatus(id, status);
    }
    remove(id) {
        return this.samplesService.remove(id);
    }
};
exports.SamplesController = SamplesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sample_dto_1.CreateSampleDto]),
    __metadata("design:returntype", void 0)
], SamplesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('assignedEmployeeId')),
    __param(2, (0, common_1.Query)('productCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SamplesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('employee-workload'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SamplesController.prototype, "getEmployeeWorkload", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SamplesController.prototype, "getSamplesByEmployee", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SamplesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sample_dto_1.UpdateSampleDto]),
    __metadata("design:returntype", void 0)
], SamplesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/assign/:employeeId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SamplesController.prototype, "assignEmployee", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SamplesController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SamplesController.prototype, "remove", null);
exports.SamplesController = SamplesController = __decorate([
    (0, common_1.Controller)('samples'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [samples_service_1.SamplesService])
], SamplesController);
//# sourceMappingURL=samples.controller.js.map