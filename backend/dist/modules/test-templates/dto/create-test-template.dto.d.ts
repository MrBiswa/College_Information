import { TestingCategory, ProductCategory } from '../../../entities/test-template.entity';
import { ReportSection } from '../../../entities/test-template.entity';
export declare class CreateTestTemplateDto {
    name: string;
    description?: string;
    testingCategory: TestingCategory;
    productCategory: ProductCategory;
    productSubCategory?: string;
    reportSections: ReportSection[];
    complianceStandards?: string[];
    equipmentRequired?: string[];
    isActive?: boolean;
    isCustom?: boolean;
    estimatedDuration?: number;
    specialInstructions?: string;
    samplePreparationSteps?: string[];
    safetyRequirements?: string[];
}
