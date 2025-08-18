import { SamplesService } from './samples.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { SampleStatus } from '../../entities/sample.entity';
export declare class SamplesController {
    private readonly samplesService;
    constructor(samplesService: SamplesService);
    create(createSampleDto: CreateSampleDto): Promise<import("../../entities/sample.entity").Sample>;
    findAll(status?: SampleStatus, assignedEmployeeId?: string, productCategory?: string): Promise<import("../../entities/sample.entity").Sample[]>;
    getEmployeeWorkload(): Promise<any[]>;
    getSamplesByEmployee(employeeId: string): Promise<import("../../entities/sample.entity").Sample[]>;
    findOne(id: string): Promise<import("../../entities/sample.entity").Sample>;
    update(id: string, updateSampleDto: UpdateSampleDto): Promise<import("../../entities/sample.entity").Sample>;
    assignEmployee(sampleId: string, employeeId: string): Promise<import("../../entities/sample.entity").Sample>;
    updateStatus(id: string, status: SampleStatus): Promise<import("../../entities/sample.entity").Sample>;
    remove(id: string): Promise<void>;
}
