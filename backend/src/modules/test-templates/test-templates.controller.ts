import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TestTemplatesService } from './test-templates.service';
import { CreateTestTemplateDto } from './dto/create-test-template.dto';
import { UpdateTestTemplateDto } from './dto/update-test-template.dto';
import { TestingCategory, ProductCategory } from '../../entities/test-template.entity';

@Controller('test-templates')
@UseGuards(AuthGuard('jwt'))
export class TestTemplatesController {
  constructor(private readonly testTemplatesService: TestTemplatesService) {}

  @Post()
  create(@Body() createTestTemplateDto: CreateTestTemplateDto) {
    return this.testTemplatesService.create(createTestTemplateDto);
  }

  @Get()
  findAll(
    @Query('testingCategory') testingCategory?: TestingCategory,
    @Query('productCategory') productCategory?: ProductCategory,
    @Query('isActive') isActive?: string,
  ) {
    return this.testTemplatesService.findAll({
      testingCategory,
      productCategory,
      isActive: isActive ? isActive === 'true' : undefined,
    });
  }

  @Get('by-product/:productCategory')
  findByProductCategory(@Param('productCategory') productCategory: ProductCategory) {
    return this.testTemplatesService.findByProductCategory(productCategory);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testTemplatesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestTemplateDto: UpdateTestTemplateDto) {
    return this.testTemplatesService.update(id, updateTestTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testTemplatesService.remove(id);
  }
}