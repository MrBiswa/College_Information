"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTemplatesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const test_templates_service_1 = require("./test-templates.service");
const test_templates_controller_1 = require("./test-templates.controller");
const test_template_entity_1 = require("../../entities/test-template.entity");
let TestTemplatesModule = class TestTemplatesModule {
};
exports.TestTemplatesModule = TestTemplatesModule;
exports.TestTemplatesModule = TestTemplatesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([test_template_entity_1.TestTemplate])],
        controllers: [test_templates_controller_1.TestTemplatesController],
        providers: [test_templates_service_1.TestTemplatesService],
        exports: [test_templates_service_1.TestTemplatesService],
    })
], TestTemplatesModule);
//# sourceMappingURL=test-templates.module.js.map