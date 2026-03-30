import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  SnyDataTableComponent,
  SnyCellDefDirective,
  SnyBulkActionsDefDirective,
  SnyBadgeDirective,
  SnyButtonDirective,
  SnyProgressComponent,
  SnyAvatarGroupComponent,
  SnyTooltipDirective,
  SnyDialogService,
  SnyToastService,
  type DataTableColumn,
  type BadgeVariant,
  type AvatarGroupItem,
} from '@sonny-ui/core';
import { ProjectService } from '../../core/services/project';
import { UserService } from '../../core/services/user';
import { ProjectStatus } from '../../core/models/project';
import { ProjectDialog } from './project-dialog';

@Component({
  selector: 'app-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyDataTableComponent,
    SnyCellDefDirective,
    SnyBulkActionsDefDirective,
    SnyBadgeDirective,
    SnyButtonDirective,
    SnyProgressComponent,
    SnyAvatarGroupComponent,
    SnyTooltipDirective,
    TitleCasePipe,
  ],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Proyectos</h1>
          <p class="text-muted-foreground">Gestiona todos los proyectos del equipo.</p>
        </div>
        <button snyBtn (click)="openCreateDialog()">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Nuevo Proyecto
        </button>
      </div>

      <sny-data-table
        [columns]="columns"
        [data]="tableData()"
        [filterable]="true"
        [paginated]="true"
        [selectable]="true"
        [hoverable]="true"
        [stickyHeader]="true"
        (rowClicked)="onRowClick($event)"
      >
        <ng-template snyCell="status" let-row="row">
          <span snyBadge [variant]="statusVariant(row['status'])">
            {{ statusLabel(row['status']) }}
          </span>
        </ng-template>

        <ng-template snyCell="priority" let-row="row">
          <span snyBadge [variant]="priorityVariant(row['priority'])" size="sm">
            {{ row['priority'] | titlecase }}
          </span>
        </ng-template>

        <ng-template snyCell="progress" let-row="row">
          <div class="w-24">
            <sny-progress [value]="row['progress']" size="sm" />
          </div>
        </ng-template>

        <ng-template snyCell="team" let-row="row">
          <sny-avatar-group [items]="row['teamAvatars']" [max]="3" size="sm" spacing="tight" />
        </ng-template>

        <ng-template snyCell="actions" let-row="row">
          <div class="flex gap-1">
            <button
              snyBtn
              variant="ghost"
              size="sm"
              [snyTooltip]="'Editar'"
              (click)="openEditDialog(row); $event.stopPropagation()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
            </button>
            <button
              snyBtn
              variant="ghost"
              size="sm"
              [snyTooltip]="'Eliminar'"
              (click)="deleteProject(row['id']); $event.stopPropagation()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </ng-template>

        <ng-template snyBulkActions let-selected>
          <button snyBtn variant="destructive" size="sm" (click)="bulkDelete(selected)">
            Eliminar seleccionados
          </button>
        </ng-template>
      </sny-data-table>
    </div>
  `,
})
export class ProjectList {
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly userService = inject(UserService);
  private readonly dialogService = inject(SnyDialogService);
  private readonly toastService = inject(SnyToastService);

  protected readonly columns: DataTableColumn[] = [
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'status', label: 'Estado', sortable: true },
    { key: 'priority', label: 'Prioridad', sortable: true },
    { key: 'progress', label: 'Progreso', sortable: true },
    { key: 'team', label: 'Equipo' },
    { key: 'endDate', label: 'Fecha Límite', sortable: true },
    { key: 'actions', label: '' },
  ];

  protected readonly tableData = computed(() =>
    this.projectService.projects().map((p) => ({
      id: p.id,
      name: p.name,
      status: p.status,
      priority: p.priority,
      progress: p.progress,
      endDate: new Date(p.endDate).toLocaleDateString('es'),
      teamAvatars: this.getTeamAvatars(p.teamMemberIds),
    })),
  );

  protected onRowClick(row: Record<string, unknown>): void {
    this.router.navigate(['/projects', row['id']]);
  }

  protected openCreateDialog(): void {
    this.dialogService.open(ProjectDialog, { width: '600px' });
  }

  protected openEditDialog(row: Record<string, unknown>): void {
    const project = this.projectService.projects().find((p) => p.id === row['id']);
    this.dialogService.open(ProjectDialog, { width: '600px', data: project });
  }

  protected deleteProject(id: string): void {
    this.projectService.remove(id);
    this.toastService.success('Proyecto eliminado', 'El proyecto fue eliminado correctamente.');
  }

  protected bulkDelete(selected: Record<string, unknown>[]): void {
    for (const row of selected) {
      this.projectService.remove(row['id'] as string);
    }
    this.toastService.success('Proyectos eliminados', `${selected.length} proyectos eliminados.`);
  }

  protected statusVariant(status: ProjectStatus): BadgeVariant {
    const map: Record<ProjectStatus, BadgeVariant> = {
      'planning': 'secondary',
      'in-progress': 'default',
      'review': 'warning',
      'completed': 'success',
      'on-hold': 'outline',
    };
    return map[status];
  }

  protected statusLabel(status: ProjectStatus): string {
    const map: Record<ProjectStatus, string> = {
      'planning': 'Planificación',
      'in-progress': 'En Progreso',
      'review': 'En Revisión',
      'completed': 'Completado',
      'on-hold': 'En Espera',
    };
    return map[status];
  }

  protected priorityVariant(priority: string): BadgeVariant {
    const map: Record<string, BadgeVariant> = {
      'low': 'secondary',
      'medium': 'default',
      'high': 'warning',
      'critical': 'destructive',
    };
    return map[priority] ?? 'default';
  }

  private getTeamAvatars(memberIds: string[]): AvatarGroupItem[] {
    return memberIds.map((id) => {
      const user = this.userService.getById(id)();
      return { src: user?.avatarUrl ?? '', alt: user?.name ?? '', fallback: user?.name?.[0] ?? '?' };
    });
  }
}
