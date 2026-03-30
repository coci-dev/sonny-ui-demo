export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  assigneeId: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}
