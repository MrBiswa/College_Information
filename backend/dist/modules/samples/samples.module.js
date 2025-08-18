"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamplesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const samples_service_1 = require("./samples.service");
const samples_controller_1 = require("./samples.controller");
const sample_entity_1 = require("../../entities/sample.entity");
const user_entity_1 = require("../../entities/user.entity");
const test_template_entity_1 = require("../../entities/test-template.entity");
let SamplesModule = class SamplesModule {
};
exports.SamplesModule = SamplesModule;
exports.SamplesModule = SamplesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sample_entity_1.Sample, user_entity_1.User, test_template_entity_1.TestTemplate])],
        controllers: [samples_controller_1.SamplesController],
        providers: [samples_service_1.SamplesService],
        exports: [samples_service_1.SamplesService],
    })
], SamplesModule);
//# sourceMappingURL=samples.module.js.map