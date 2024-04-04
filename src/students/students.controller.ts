import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  getAllTasks() {
    return this.studentService.findAll();
  }

  @Post('create')
  createStudent(@Body() body) {
    return this.studentService.create(body);
  }

  @Put('update/:id')
  updateStudent(@Param('id') id: number, @Body() body) {
    return this.studentService.update(id, body);
  }

  @Delete('delete/:id')
  deleteStudent(@Param('id') id: number) {
    return this.studentService.deleteStudent(id);
  }
}
