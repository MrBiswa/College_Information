import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Sample, SampleStatus } from '../../entities/sample.entity';
import { User } from '../../entities/user.entity';
import { TestTemplate } from '../../entities/test-template.entity';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';

@Injectable()
export class SamplesService {
  constructor(
    @InjectRepository(Sample)
    private sampleRepository: Repository<Sample>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TestTemplate)
    private testTemplateRepository: Repository<TestTemplate>,
  ) {}

  async create(createSampleDto: CreateSampleDto): Promise<Sample> {
    // Generate sample number
    const count = await this.sampleRepository.count();
    const sampleNumber = `LAB-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const sample: Sample = this.sampleRepository.create({
      ...createSampleDto,
      sampleNumber,
      manufacturingDate: createSampleDto.manufacturingDate ? new Date(createSampleDto.manufacturingDate) : null,
      expectedCompletionDate: createSampleDto.expectedCompletionDate ? new Date(createSampleDto.expectedCompletionDate) : null,
    } as DeepPartial<Sample>);

    return this.sampleRepository.save(sample);
  }

  async findAll(filters?: {
    status?: SampleStatus;
    assignedEmployeeId?: string;
    productCategory?: string;
  }): Promise<Sample[]> {
    const queryBuilder = this.sampleRepository.createQueryBuilder('sample')
      .leftJoinAndSelect('sample.assignedEmployee', 'employee')
      .leftJoinAndSelect('sample.testTemplate', 'template');

    if (filters?.status) {
      queryBuilder.andWhere('sample.status = :status', { status: filters.status });
    }

    if (filters?.assignedEmployeeId) {
      queryBuilder.andWhere('sample.assigned_employee_id = :employeeId', { 
        employeeId: filters.assignedEmployeeId 
      });
    }

    if (filters?.productCategory) {
      queryBuilder.andWhere('sample.productCategory = :category', { 
        category: filters.productCategory 
      });
    }

    return queryBuilder
      .orderBy('sample.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<Sample> {
    const sample = await this.sampleRepository.findOne({
      where: { id },
      relations: ['assignedEmployee', 'testTemplate', 'reports'],
    });

    if (!sample) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }

    return sample;
  }

  async update(id: string, updateSampleDto: UpdateSampleDto): Promise<Sample> {
    const sample = await this.findOne(id);

    // Handle employee assignment
    if (updateSampleDto.assignedEmployeeId) {
      const employee = await this.userRepository.findOne({
        where: { id: updateSampleDto.assignedEmployeeId }
      });

      if (!employee) {
        throw new NotFoundException('Employee not found');
      }

      sample.assignedEmployee = employee;
      sample.assigned_employee_id = employee.id;
      
      // Update status to assigned if it was submitted
      if (sample.status === SampleStatus.SUBMITTED) {
        sample.status = SampleStatus.ASSIGNED;
      }
    }

    // Handle test template assignment
    if (updateSampleDto.testTemplateId) {
      const template = await this.testTemplateRepository.findOne({
        where: { id: updateSampleDto.testTemplateId }
      });

      if (!template) {
        throw new NotFoundException('Test template not found');
      }

      sample.testTemplate = template;
      sample.test_template_id = template.id;
    }

    // Update other fields
    Object.assign(sample, {
      ...updateSampleDto,
      manufacturingDate: updateSampleDto.manufacturingDate ? new Date(updateSampleDto.manufacturingDate) : sample.manufacturingDate,
      expectedCompletionDate: updateSampleDto.expectedCompletionDate ? new Date(updateSampleDto.expectedCompletionDate) : sample.expectedCompletionDate,
      actualCompletionDate: updateSampleDto.actualCompletionDate ? new Date(updateSampleDto.actualCompletionDate) : sample.actualCompletionDate,
    });

    return this.sampleRepository.save(sample);
  }

  async remove(id: string): Promise<void> {
    const sample = await this.findOne(id);
    
    // Only allow deletion if sample is not in progress
    if (sample.status === SampleStatus.IN_PROGRESS || sample.status === SampleStatus.TESTING_COMPLETE) {
      throw new BadRequestException('Cannot delete sample that is in progress or completed');
    }

    await this.sampleRepository.remove(sample);
  }

  async assignEmployee(sampleId: string, employeeId: string): Promise<Sample> {
    const sample = await this.findOne(sampleId);
    const employee = await this.userRepository.findOne({
      where: { id: employeeId }
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    sample.assignedEmployee = employee;
    sample.assigned_employee_id = employee.id;
    sample.status = SampleStatus.ASSIGNED;

    return this.sampleRepository.save(sample);
  }

  async getEmployeeWorkload(): Promise<any[]> {
    const employees = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.assignedSamples', 'sample')
      .where('user.role = :role', { role: 'employee' })
      .andWhere('user.isActive = :active', { active: true })
      .getMany();

    return employees.map(employee => ({
      id: employee.id,
      name: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
      testingCategories: employee.testingCategories,
      currentWorkload: employee.assignedSamples?.filter(sample => 
        sample.status === SampleStatus.ASSIGNED || 
        sample.status === SampleStatus.IN_PROGRESS
      ).length || 0,
      totalAssigned: employee.assignedSamples?.length || 0,
    }));
  }

  async getSamplesByEmployee(employeeId: string): Promise<Sample[]> {
    return this.sampleRepository.find({
      where: { assigned_employee_id: employeeId },
      relations: ['testTemplate'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: string, status: SampleStatus): Promise<Sample> {
    const sample = await this.findOne(id);
    sample.status = status;

    if (status === SampleStatus.COMPLETED) {
      sample.actualCompletionDate = new Date();
    }

    return this.sampleRepository.save(sample);
  }
}