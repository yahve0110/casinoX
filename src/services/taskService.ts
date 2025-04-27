import { taskRepository } from '@/repository/taskRepository';
import { CreateTaskDto } from '@/dto/task.dto';

export const taskService = {
  getAllTasks: () => {
    return taskRepository.findAll();
  },

  createTask: (dto: CreateTaskDto) => {
    const newTask = {
      id: Date.now(),
      ...dto,
    };
    return taskRepository.create(newTask);
  },
};
