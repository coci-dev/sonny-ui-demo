import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardContentDirective,
  SnyStepsDirective,
  SnyStepDirective,
  SnyProgressComponent,
  SnyBadgeDirective,
  SnyAvatarGroupComponent,
  type AvatarGroupItem,
  type BadgeVariant,
} from '@sonny-ui/core';
import { Project, ProjectStatus } from '../../core/models/project';

@Component({
  selector: 'app-project-overview-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyCardDirective,
    SnyCardHeaderDirective,
    SnyCardTitleDirective,
    SnyCardContentDirective,
    SnyStepsDirective,
    SnyStepDirective,
    SnyProgressComponent,
    SnyBadgeDirective,
    SnyAvatarGroupComponent,
  ],
  template: `
    @let p = project();
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Información General</h3>
        </div>
        <div snyCardContent class="space-y-4">
          <p class="text-muted-foreground">{{ p.description }}</p>

          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>Progreso</span>
              <span>{{ p.progress }}%</span>
            </div>
            <sny-progress [value]="p.progress" />
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-muted-foreground">Estado</span>
              <div class="mt-1">
                <span snyBadge [variant]="statusVariant(p.status)">{{ statusLabel(p.status) }}</span>
              </div>
            </div>
            <div>
              <span class="text-muted-foreground">Prioridad</span>
              <div class="mt-1">
                <span snyBadge variant="outline">{{ p.priority }}</span>
              </div>
            </div>
            <div>
              <span class="text-muted-foreground">Inicio</span>
              <p class="font-medium">{{ p.startDate }}</p>
            </div>
            <div>
              <span class="text-muted-foreground">Límite</span>
              <p class="font-medium">{{ p.endDate }}</p>
            </div>
          </div>

          <div>
            <span class="text-sm text-muted-foreground">Equipo</span>
            <div class="mt-2">
              <sny-avatar-group [items]="teamAvatars()" [max]="5" size="md" />
            </div>
          </div>
        </div>
      </div>

      <div snyCard>
        <div snyCardHeader>
          <h3 snyCardTitle>Fases del Proyecto</h3>
        </div>
        <div snyCardContent>
          <div snySteps orientation="vertical" size="md">
            @for (phase of p.phases; track phase.name) {
              <div snyStep [status]="mapStatus(phase.status)">
                <span>{{ phase.name }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProjectOverviewTab {
  readonly project = input.required<Project>();
  readonly teamAvatars = input.required<AvatarGroupItem[]>();

  protected mapStatus(status: string): 'default' | 'active' | 'completed' | 'error' {
    if (status === 'complete') return 'completed';
    return status as 'default' | 'active' | 'error';
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
}
