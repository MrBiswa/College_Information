import { TestTemplatesService } from './test-templates.service';
import { CreateTestTemplateDto } from './dto/create-test-template.dto';
import { UpdateTestTemplateDto } from './dto/update-test-template.dto';
import { TestingCategory, ProductCategory } from '../../entities/test-template.entity';
export declare class TestTemplatesController {
    private readonly testTemplatesService;
    constructor(testTemplatesService: TestTemplatesService);
    create(createTestTemplateDto: CreateTestTemplateDto): Promise<import("../../entities/test-template.entity").TestTemplate>;
    findAll(testingCategory?: TestingCategory, productCategory?: ProductCategory, isActive?: string): Promise<import("../../entities/test-template.entity").TestTemplate[]>;
    findByProductCategory(productCategory: ProductCategory): Promise<import("../../entities/test-template.entity").TestTemplate[]>;
    findOne(id: string): Promise<import("../../entities/test-template.entity").TestTemplate>;
    update(id: string, updateTestTemplateDto: UpdateTestTemplateDto): Promise<import("../../entities/test-template.entity").TestTemplate>;
    remove(id: string): Promise<void>;
}
