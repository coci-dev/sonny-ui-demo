import { computed, Injectable, signal } from '@angular/core';
import { Task } from '../models/task';
import { MOCK_TASKS } from '../data/mock-tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _tasks = signal<Task[]>(MOCK_TASKS);

  readonly tasks = this._tasks.asReadonly();

  readonly completedCount = computed(
    () => this._tasks().filter((t) => t.status === 'done').length,
  );

  readonly totalCount = computed(() => this._tasks().length);

  getByProjectId(projectId: string) {
    return computed(() => this._tasks().filter((t) => t.projectId === projectId));
  }

  add(task: Task): void {
    this._tasks.update((list) => [task, ...list]);
  }

  update(id: string, partial: Partial<Task>): void {
    this._tasks.update((list) =>
      list.map((t) => (t.id === id ? { ...t, ...partial } : t)),
    );
  }

  remove(id: string): void {
    this._tasks.update((list) => list.filter((t) => t.id !== id));
  }
}
