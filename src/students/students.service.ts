import { Body, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.entity';
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async findAll() {
    try {
      const students = await this.studentModel.find().exec();
      return {
        ok: true,
        message: 'All students',
        data: students,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Error Internal Server',
        data: null,
      };
    }
  }

  async create(
    @Body() body,
  ): Promise<{ ok: boolean; message: string; data: Student }> {
    try {
      const studantData = {
        name: body.name,
        identification: body.identification,
        age: body.age,
      };

      if (
        studantData.name.length == 0 ||
        studantData.identification.length == 0 ||
        studantData.age.length == 0
      ) {
        return {
          ok: false,
          message: 'All fields required',
          data: null,
        };
      }

      const student = new this.studentModel(studantData);
      const studentSaved = await student.save();
      return { ok: true, message: 'Studen created', data: studentSaved };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Error Internal Server',
        data: null,
      };
    }
  }

  async update(
    @Param('id') id: number,
    @Body() body,
  ): Promise<{ ok: boolean; message: string; data: Student }> {
    try {
      const studentFound = await this.studentModel.findOne({
        identification: id.toString(),
      });

      if (!studentFound) {
        return {
          ok: false,
          message: 'Student not found',
          data: null,
        };
      }

      const newStudent = {
        name: body.name,
        identification: body.identification,
        age: body.age,
      };

      if (
        newStudent.name.length == 0 ||
        newStudent.identification.length == 0 ||
        newStudent.age.length == 0
      ) {
        return {
          ok: false,
          message: 'All fields required',
          data: null,
        };
      }

      await studentFound.updateOne(newStudent);
      const studentUpdated = await this.studentModel.findOne({
        identification: id.toString(),
      });
      return {
        ok: true,
        message: 'Student updated succesfully',
        data: studentUpdated,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Error Internal Server',
        data: null,
      };
    }
  }

  async deleteStudent(@Param('id') id: number) {
    try {
      const studentFound = await this.studentModel.findOne({
        identification: id.toString(),
      });

      if (!studentFound) {
        return {
          ok: false,
          message: 'Student not found',
          data: null,
        };
      }

      await studentFound.deleteOne();
      return {
        ok: true,
        message: 'Student deleted succesfully',
        data: studentFound,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Error Internal Server',
        data: null,
      };
    }
  }
}
