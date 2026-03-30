import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  SnyTabsDirective,
  SnyTabsListDirective,
  SnyTabsTriggerDirective,
  SnyTabsContentDirective,
  SnyBadgeDirective,
  SnyBreadcrumbDirective,
  SnyBreadcrumbListDirective,
  SnyBreadcrumbItemDirective,
  SnyBreadcrumbLinkDirective,
  SnyBreadcrumbSeparatorDirective,
  SnyBreadcrumbPageDirective,
  type AvatarGroupItem,
  type BadgeVariant,
} from '@sonny-ui/core';
import { ProjectService } from '../../core/services/project';
import { UserService } from '../../core/services/user';
import { ProjectStatus } from '../../core/models/project';
import { ProjectOverviewTab } from './project-overview-tab';
import { ProjectTasksTab } from './project-tasks-tab';
import { ProjectTimelineTab } from './project-timeline-tab';

@Component({
  selector: 'app-project-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyTabsDirective,
    SnyTabsListDirective,
    SnyTabsTriggerDirective,
    SnyTabsContentDirective,
    SnyBadgeDirective,
    SnyBreadcrumbDirective,
    SnyBreadcrumbListDirective,
    SnyBreadcrumbItemDirective,
    SnyBreadcrumbLinkDirective,
    SnyBreadcrumbSeparatorDirective,
    SnyBreadcrumbPageDirective,
    ProjectOverviewTab,
    ProjectTasksTab,
    ProjectTimelineTab,
  ],
  template: `
    @let p = project();
    @if (p) {
      <div class="space-y-6">
        <div>
          <nav snyBreadcrumb class="mb-2">
            <ol snyBreadcrumbList>
              <li snyBreadcrumbItem>
                <a snyBreadcrumbLink class="cursor-pointer" (click)="goBack()">Proyectos</a>
              </li>
              <li snyBreadcrumbSeparator class="text-muted-foreground">/</li>
              <li snyBreadcrumbItem>
                <span snyBreadcrumbPage>{{ p.name }}</span>
              </li>
            </ol>
          </nav>
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-bold tracking-tight">{{ p.name }}</h1>
            <span snyBadge [variant]="statusVariant(p.status)">{{ statusLabel(p.status) }}</span>
          </div>
        </div>

        <div snyTabs [(value)]="activeTab">
          <div snyTabsList>
            <button snyTabsTrigger value="overview">Resumen</button>
            <button snyTabsTrigger value="tasks">Tareas</button>
            <button snyTabsTrigger value="timeline">Línea de Tiempo</button>
          </div>

          <div snyTabsContent value="overview" class="mt-6">
            <app-project-overview-tab [project]="p" [teamAvatars]="teamAvatars()" />
          </div>

          <div snyTabsContent value="tasks" class="mt-6">
            <app-project-tasks-tab [projectId]="p.id" />
          </div>

          <div snyTabsContent value="timeline" class="mt-6">
            <app-project-timeline-tab [projectId]="p.id" />
          </div>
        </div>
      </div>
    } @else {
      <p class="text-muted-foreground">Proyecto no encontrado.</p>
    }
  `,
})
export class ProjectDetail {
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly userService = inject(UserService);

  readonly id = input<string>();
  protected readonly activeTab = signal('overview');

  protected readonly project = computed(() => {
    const id = this.id();
    return id ? this.projectService.getById(id)() : undefined;
  });

  protected readonly teamAvatars = computed<AvatarGroupItem[]>(() => {
    const p = this.project();
    if (!p) return [];
    return p.teamMemberIds.map((id) => {
      const user = this.userService.getById(id)();
      return { src: user?.avatarUrl ?? '', alt: user?.name ?? '', fallback: user?.name?.[0] ?? '?' };
    });
  });

  protected goBack(): void {
    this.router.navigate(['/projects']);
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
