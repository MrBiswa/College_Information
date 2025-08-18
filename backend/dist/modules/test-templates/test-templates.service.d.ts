import { Repository } from 'typeorm';
import { TestTemplate, TestingCategory, ProductCategory } from '../../entities/test-template.entity';
import { CreateTestTemplateDto } from './dto/create-test-template.dto';
import { UpdateTestTemplateDto } from './dto/update-test-template.dto';
export declare class TestTemplatesService {
    private testTemplateRepository;
    constructor(testTemplateRepository: Repository<TestTemplate>);
    create(createTestTemplateDto: CreateTestTemplateDto): Promise<TestTemplate>;
    findAll(filters?: {
        testingCategory?: TestingCategory;
        productCategory?: ProductCategory;
        isActive?: boolean;
    }): Promise<TestTemplate[]>;
    findOne(id: string): Promise<TestTemplate>;
    update(id: string, updateTestTemplateDto: UpdateTestTemplateDto): Promise<TestTemplate>;
    remove(id: string): Promise<void>;
    findByProductCategory(productCategory: ProductCategory): Promise<TestTemplate[]>;
    createDefaultTemplates(): Promise<void>;
    private getDefaultTemplates;
}
