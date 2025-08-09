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
exports.TestTemplatesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const test_templates_service_1 = require("./test-templates.service");
const create_test_template_dto_1 = require("./dto/create-test-template.dto");
const update_test_template_dto_1 = require("./dto/update-test-template.dto");
const test_template_entity_1 = require("../../entities/test-template.entity");
let TestTemplatesController = class TestTemplatesController {
    testTemplatesService;
    constructor(testTemplatesService) {
        this.testTemplatesService = testTemplatesService;
    }
    create(createTestTemplateDto) {
        return this.testTemplatesService.create(createTestTemplateDto);
    }
    findAll(testingCategory, productCategory, isActive) {
        return this.testTemplatesService.findAll({
            testingCategory,
            productCategory,
            isActive: isActive ? isActive === 'true' : undefined,
        });
    }
    findByProductCategory(productCategory) {
        return this.testTemplatesService.findByProductCategory(productCategory);
    }
    findOne(id) {
        return this.testTemplatesService.findOne(id);
    }
    update(id, updateTestTemplateDto) {
        return this.testTemplatesService.update(id, updateTestTemplateDto);
    }
    remove(id) {
        return this.testTemplatesService.remove(id);
    }
};
exports.TestTemplatesController = TestTemplatesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_test_template_dto_1.CreateTestTemplateDto]),
    __metadata("design:returntype", void 0)
], TestTemplatesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('testingCategory')),
    __param(1, (0, common_1.Query)('productCategory')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], TestTemplatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-product/:productCategory'),
    __param(0, (0, common_1.Param)('productCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestTemplatesController.prototype, "findByProductCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestTemplatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_test_template_dto_1.UpdateTestTemplateDto]),
    __metadata("design:returntype", void 0)
], TestTemplatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestTemplatesController.prototype, "remove", null);
exports.TestTemplatesController = TestTemplatesController = __decorate([
    (0, common_1.Controller)('test-templates'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [test_templates_service_1.TestTemplatesService])
], TestTemplatesController);
//# sourceMappingURL=test-templates.controller.js.map