import { User } from './user.entity';
import { Report } from './report.entity';
import { TestTemplate } from './test-template.entity';
export declare enum SampleStatus {
    SUBMITTED = "submitted",
    ASSIGNED = "assigned",
    IN_PROGRESS = "in_progress",
    TESTING_COMPLETE = "testing_complete",
    REPORT_GENERATED = "report_generated",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
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
export declare class Sample {
    id: string;
    sampleNumber: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientAddress: string;
    productName: string;
    productCategory: ProductCategory;
    productDescription: string;
    manufacturerName: string;
    modelNumber: string;
    batchNumber: string;
    manufacturingDate: Date;
    requiredTests: string[];
    status: SampleStatus;
    expectedCompletionDate: Date;
    actualCompletionDate: Date;
    specialInstructions: string;
    notes: string;
    assignedEmployee: User;
    assigned_employee_id: string;
    testTemplate: TestTemplate;
    test_template_id: string;
    reports: Report[];
    createdAt: Date;
    updatedAt: Date;
}
