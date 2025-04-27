interface Task {
  id: number;
  title: string;
  description?: string;
}

const tasks: Task[] = [];

export const taskRepository = {
  findAll: (): Task[] => {
    return tasks;
  },

  create: (task: Task): Task => {
    tasks.push(task);
    return task;
  },
};
