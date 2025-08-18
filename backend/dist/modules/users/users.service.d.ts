import { Repository } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(filters?: {
        role?: UserRole;
        isActive?: boolean;
    }): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findEmployees(): Promise<User[]>;
    updateUser(id: string, updateData: Partial<User>): Promise<User>;
    deactivateUser(id: string): Promise<User>;
    activateUser(id: string): Promise<User>;
}
