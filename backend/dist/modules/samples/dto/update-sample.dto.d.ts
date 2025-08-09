import { CreateSampleDto } from './create-sample.dto';
import { SampleStatus } from '../../../entities/sample.entity';
declare const UpdateSampleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSampleDto>>;
export declare class UpdateSampleDto extends UpdateSampleDto_base {
    status?: SampleStatus;
    assignedEmployeeId?: string;
    testTemplateId?: string;
    actualCompletionDate?: string;
}
export {};
