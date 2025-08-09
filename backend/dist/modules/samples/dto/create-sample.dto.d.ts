import { ProductCategory } from '../../../entities/test-template.entity';
export declare class CreateSampleDto {
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    clientAddress?: string;
    productName: string;
    productCategory: ProductCategory;
    productDescription?: string;
    manufacturerName?: string;
    modelNumber?: string;
    batchNumber?: string;
    manufacturingDate?: string;
    requiredTests?: string[];
    expectedCompletionDate?: string;
    specialInstructions?: string;
    notes?: string;
}
