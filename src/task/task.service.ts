import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(createTaskDto : CreateTaskDto): Promise<Task> {
    let createdTask = await this.taskModel.findOne({title: createTaskDto.title});
    if(createdTask){
      throw new ConflictException({message: 'Task already exists',task: createdTask});
    }
    createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }
  
  async getTasks(): Promise<Task[]> {
    const tasks : Task[] = await this.taskModel.find();
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException(`Task with ID ${id} not found!`);
    return task;
  }
}
