import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
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
        role: UserRole;
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
    findById(id: string): Promise<User | null>;
    createDefaultAdmin(): Promise<void>;
}
