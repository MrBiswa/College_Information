import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SamplesService } from './samples.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { SampleStatus } from '../../entities/sample.entity';

@Controller('samples')
@UseGuards(AuthGuard('jwt'))
export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  @Post()
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.samplesService.create(createSampleDto);
  }

  @Get()
  findAll(
    @Query('status') status?: SampleStatus,
    @Query('assignedEmployeeId') assignedEmployeeId?: string,
    @Query('productCategory') productCategory?: string,
  ) {
    return this.samplesService.findAll({
      status,
      assignedEmployeeId,
      productCategory,
    });
  }

  @Get('employee-workload')
  getEmployeeWorkload() {
    return this.samplesService.getEmployeeWorkload();
  }

  @Get('employee/:employeeId')
  getSamplesByEmployee(@Param('employeeId') employeeId: string) {
    return this.samplesService.getSamplesByEmployee(employeeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.samplesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.samplesService.update(id, updateSampleDto);
  }

  @Patch(':id/assign/:employeeId')
  assignEmployee(
    @Param('id') sampleId: string,
    @Param('employeeId') employeeId: string,
  ) {
    return this.samplesService.assignEmployee(sampleId, employeeId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: SampleStatus,
  ) {
    return this.samplesService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.samplesService.remove(id);
  }
}