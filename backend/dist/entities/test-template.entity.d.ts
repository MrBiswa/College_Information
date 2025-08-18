import { Sample } from './sample.entity';
export declare enum TestingCategory {
    ELECTRICAL = "electrical",
    MECHANICAL = "mechanical",
    THERMAL = "thermal",
    FLUID_FLOW = "fluid_flow",
    ELECTRO_TECHNICAL = "electro_technical"
}
export declare enum ProductCategory {
    LEATHER = "leather",
    SHOE = "shoe",
    ELECTRICAL = "electrical",
    TOYS = "toys",
    MECHANICAL = "mechanical",
    THERMAL = "thermal",
    ELECTRONICS = "electronics",
    OTHER = "other"
}
export interface TestParameter {
    id: string;
    name: string;
    description: string;
    unit: string;
    minValue?: number;
    maxValue?: number;
    acceptableLimits?: string;
    testMethod: string;
    equipment: string;
    isRequired: boolean;
    isCustom?: boolean;
}
export interface ReportSection {
    id: string;
    title: string;
    order: number;
    parameters: TestParameter[];
    isRequired: boolean;
    isCustom?: boolean;
}
export declare class TestTemplate {
    id: string;
    name: string;
    description: string;
    testingCategory: TestingCategory;
    productCategory: ProductCategory;
    productSubCategory: string;
    reportSections: ReportSection[];
    complianceStandards: string[];
    equipmentRequired: string[];
    isActive: boolean;
    isCustom: boolean;
    estimatedDuration: number;
    specialInstructions: string;
    samplePreparationSteps: string[];
    safetyRequirements: string[];
    samples: Sample[];
    createdAt: Date;
    updatedAt: Date;
}
