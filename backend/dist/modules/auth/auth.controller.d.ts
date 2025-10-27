import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            testingCategories: any;
            isActive: any;
        };
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: import("../../entities/user.entity").UserRole;
        testingCategories: string[];
        isActive: boolean;
        phone: string;
        address: string;
        qualification: string;
        experience: string;
        assignedSamples: import("../../entities/sample.entity").Sample[];
        preparedReports: import("../../entities/report.entity").Report[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(req: any): any;
    getMe(req: any): Promise<import("../../entities/user.entity").User | null>;
}
