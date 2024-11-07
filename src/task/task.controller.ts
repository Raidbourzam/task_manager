import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  async createTask(@Body() createTaskDto : CreateTaskDto): Promise<Task> {
    const task = await this.taskService.createTask(createTaskDto);
    return task;
  }

  @Get('')
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }


}
