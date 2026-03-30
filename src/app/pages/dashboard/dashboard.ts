import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardContentDirective,
  SnyProgressComponent,
  SnyBadgeDirective,
  type BadgeVariant,
} from '@sonny-ui/core';
import { ProjectService } from '../../core/services/project';
import { ProjectStatus } from '../../core/models/project';
import { StatsRow } from './stats-row';
import { ActivityTimeline } from './activity-timeline';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StatsRow,
    ActivityTimeline,
    SnyCardDirective,
    SnyCardHeaderDirective,
    SnyCardTitleDirective,
    SnyCardContentDirective,
    SnyProgressComponent,
    SnyBadgeDirective,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-muted-foreground">Vista general de tus proyectos y equipo.</p>
      </div>

      <app-stats-row />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <app-activity-timeline />

        <div snyCard>
          <div snyCardHeader>
            <h3 snyCardTitle>Progreso de Proyectos</h3>
          </div>
          <div snyCardContent>
            <div class="space-y-4">
              @for (project of projectService.projects(); track project.id) {
                <div class="space-y-1.5 py-1">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold">{{ project.name }}</span>
                    <span snyBadge [variant]="statusVariant(project.status)" size="sm">
                      {{ statusLabel(project.status) }}
                    </span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="flex-1">
                      <sny-progress [value]="project.progress" [max]="100" size="sm" />
                    </div>
                    <span class="text-xs font-semibold text-muted-foreground tabular-nums w-8 text-right">{{ project.progress }}%</span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Dashboard {
  protected readonly projectService = inject(ProjectService);

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
}
