import { Sample } from './sample.entity';
import { Report } from './report.entity';
export declare enum UserRole {
    ADMIN = "admin",
    EMPLOYEE = "employee",
    CLIENT = "client"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    testingCategories: string[];
    isActive: boolean;
    phone: string;
    address: string;
    qualification: string;
    experience: string;
    assignedSamples: Sample[];
    preparedReports: Report[];
    createdAt: Date;
    updatedAt: Date;
}
