import { Repository } from 'typeorm';
import { Sample, SampleStatus } from '../../entities/sample.entity';
import { User } from '../../entities/user.entity';
import { TestTemplate } from '../../entities/test-template.entity';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
export declare class SamplesService {
    private sampleRepository;
    private userRepository;
    private testTemplateRepository;
    constructor(sampleRepository: Repository<Sample>, userRepository: Repository<User>, testTemplateRepository: Repository<TestTemplate>);
    create(payload: CreateSampleDto): Promise<Sample>;
    findAll(filters?: {
        status?: SampleStatus;
        assignedEmployeeId?: string;
        productCategory?: string;
    }): Promise<Sample[]>;
    findOne(id: string): Promise<Sample>;
    update(id: string, updateSampleDto: UpdateSampleDto): Promise<Sample>;
    remove(id: string): Promise<void>;
    assignEmployee(sampleId: string, employeeId: string): Promise<Sample>;
    getEmployeeWorkload(): Promise<any[]>;
    getSamplesByEmployee(employeeId: string): Promise<Sample[]>;
    updateStatus(id: string, status: SampleStatus): Promise<Sample>;
}
