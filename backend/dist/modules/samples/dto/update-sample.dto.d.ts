import { CreateSampleDto } from './create-sample.dto';
import { SampleStatus } from '../../../entities/sample.entity';
export declare class UpdateSampleDto extends CreateSampleDto {
    status?: SampleStatus;
    assignedEmployeeId?: string;
    testTemplateId?: string;
    actualCompletionDate?: string;
}
