import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  SnyDataTableComponent,
  SnyCellDefDirective,
  SnyBadgeDirective,
  SnyAvatarComponent,
  type DataTableColumn,
  type BadgeVariant,
} from '@sonny-ui/core';
import { TaskService } from '../../core/services/task';
import { UserService } from '../../core/services/user';
import { TaskStatus, TaskPriority } from '../../core/models/task';

@Component({
  selector: 'app-project-tasks-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyDataTableComponent,
    SnyCellDefDirective,
    SnyBadgeDirective,
    SnyAvatarComponent,
  ],
  template: `
    <sny-data-table
      [columns]="columns"
      [data]="tableData()"
      [filterable]="true"
      [paginated]="false"
      [hoverable]="true"
    >
      <ng-template snyCell="status" let-row="row">
        <span snyBadge [variant]="taskStatusVariant(row['status'])" size="sm">
          {{ taskStatusLabel(row['status']) }}
        </span>
      </ng-template>

      <ng-template snyCell="priority" let-row="row">
        <span snyBadge [variant]="taskPriorityVariant(row['priority'])" size="sm">
          {{ row['priority'] }}
        </span>
      </ng-template>

      <ng-template snyCell="assignee" let-row="row">
        <div class="flex items-center gap-2">
          <sny-avatar [src]="row['assigneeAvatar']" [alt]="row['assigneeName']" size="sm" />
          <span class="text-sm">{{ row['assigneeName'] }}</span>
        </div>
      </ng-template>
    </sny-data-table>
  `,
})
export class ProjectTasksTab {
  readonly projectId = input.required<string>();

  private readonly taskService = inject(TaskService);
  private readonly userService = inject(UserService);

  protected readonly columns: DataTableColumn[] = [
    { key: 'title', label: 'Tarea', sortable: true },
    { key: 'status', label: 'Estado', sortable: true },
    { key: 'priority', label: 'Prioridad', sortable: true },
    { key: 'assignee', label: 'Asignado' },
    { key: 'dueDate', label: 'Fecha Límite', sortable: true },
  ];

  protected readonly tableData = computed(() => {
    const tasks = this.taskService.getByProjectId(this.projectId())();
    return tasks.map((t) => {
      const user = this.userService.getById(t.assigneeId)();
      return {
        id: t.id,
        title: t.title,
        status: t.status,
        priority: t.priority,
        assigneeName: user?.name ?? 'Sin asignar',
        assigneeAvatar: user?.avatarUrl ?? '',
        dueDate: new Date(t.dueDate).toLocaleDateString('es'),
      };
    });
  });

  protected taskStatusVariant(status: TaskStatus): BadgeVariant {
    const map: Record<TaskStatus, BadgeVariant> = {
      'todo': 'secondary',
      'in-progress': 'default',
      'done': 'success',
      'blocked': 'destructive',
    };
    return map[status];
  }

  protected taskStatusLabel(status: TaskStatus): string {
    const map: Record<TaskStatus, string> = {
      'todo': 'Pendiente',
      'in-progress': 'En Progreso',
      'done': 'Completada',
      'blocked': 'Bloqueada',
    };
    return map[status];
  }

  protected taskPriorityVariant(priority: TaskPriority): BadgeVariant {
    const map: Record<TaskPriority, BadgeVariant> = {
      'low': 'secondary',
      'medium': 'default',
      'high': 'warning',
      'urgent': 'destructive',
    };
    return map[priority];
  }
}
