import { Sample } from './sample.entity';
import { TestTemplate } from './test-template.entity';
import { User } from './user.entity';
export declare enum ReportStatus {
    DRAFT = "draft",
    IN_REVIEW = "in_review",
    APPROVED = "approved",
    PUBLISHED = "published",
    REJECTED = "rejected"
}
export interface TestResult {
    parameterId: string;
    parameterName: string;
    measuredValue: string | number;
    unit: string;
    acceptableLimits?: string;
    result: 'PASS' | 'FAIL' | 'N/A';
    remarks?: string;
    testDate: Date;
    equipment: string;
    testMethod: string;
}
export interface ReportData {
    sectionId: string;
    sectionTitle: string;
    results: TestResult[];
    observations?: string;
    recommendations?: string;
}
export declare class Report {
    id: string;
    reportNumber: string;
    title: string;
    status: ReportStatus;
    sample: Sample;
    sample_id: string;
    testTemplate: TestTemplate;
    test_template_id: string;
    preparedBy: User;
    prepared_by_id: string;
    reviewedBy: User;
    reviewed_by_id: string;
    approvedBy: User;
    approved_by_id: string;
    reportData: ReportData[];
    executiveSummary: string;
    testProcedure: string;
    observations: string;
    recommendations: string;
    conclusion: string;
    attachments: string[];
    testStartDate: Date;
    testEndDate: Date;
    reportDate: Date;
    reviewDate: Date;
    approvalDate: Date;
    publishedDate: Date;
    reviewComments: string;
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
