import { UsersService } from './users.service';
import { UserRole } from '../../entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(role?: UserRole, isActive?: string): Promise<import("../../entities/user.entity").User[]>;
    findEmployees(): Promise<import("../../entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../../entities/user.entity").User>;
    update(id: string, updateData: any): Promise<import("../../entities/user.entity").User>;
    deactivate(id: string): Promise<import("../../entities/user.entity").User>;
    activate(id: string): Promise<import("../../entities/user.entity").User>;
}
