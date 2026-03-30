import { computed, Injectable, signal } from '@angular/core';
import { Project } from '../models/project';
import { MOCK_PROJECTS } from '../data/mock-projects';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly _projects = signal<Project[]>(MOCK_PROJECTS);

  readonly projects = this._projects.asReadonly();

  readonly activeCount = computed(
    () => this._projects().filter((p) => p.status === 'in-progress').length,
  );

  readonly completedCount = computed(
    () => this._projects().filter((p) => p.status === 'completed').length,
  );

  readonly overdueCount = computed(() => {
    const now = new Date().toISOString().split('T')[0];
    return this._projects().filter((p) => p.endDate < now && p.status !== 'completed').length;
  });

  readonly totalCount = computed(() => this._projects().length);

  getById(id: string) {
    return computed(() => this._projects().find((p) => p.id === id));
  }

  add(project: Project): void {
    this._projects.update((list) => [project, ...list]);
  }

  update(id: string, partial: Partial<Project>): void {
    this._projects.update((list) =>
      list.map((p) => (p.id === id ? { ...p, ...partial } : p)),
    );
  }

  remove(id: string): void {
    this._projects.update((list) => list.filter((p) => p.id !== id));
  }
}
