import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsService } from './reports.service';
import { ReportStatus } from '../../entities/report.entity';

@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll(
    @Query('status') status?: ReportStatus,
    @Query('preparedById') preparedById?: string,
  ) {
    return this.reportsService.findAll({
      status,
      preparedById,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Post('create/:sampleId/:preparedById')
  create(
    @Param('sampleId') sampleId: string,
    @Param('preparedById') preparedById: string,
  ) {
    return this.reportsService.create(sampleId, preparedById);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: ReportStatus,
    @Body('userId') userId?: string,
  ) {
    return this.reportsService.updateStatus(id, status, userId);
  }
}