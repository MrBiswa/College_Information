"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestTemplateDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_test_template_dto_1 = require("./create-test-template.dto");
class UpdateTestTemplateDto extends (0, mapped_types_1.PartialType)(create_test_template_dto_1.CreateTestTemplateDto) {
}
exports.UpdateTestTemplateDto = UpdateTestTemplateDto;
//# sourceMappingURL=update-test-template.dto.js.map