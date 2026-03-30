import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  SnyCardDirective,
  SnyCardContentDirective,
  SnyStatDirective,
  SnyStatTitleDirective,
  SnyStatValueDirective,
  SnyStatDescriptionDirective,
} from '@sonny-ui/core';
import { ProjectService } from '../../core/services/project';
import { TaskService } from '../../core/services/task';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-stats-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyCardDirective,
    SnyCardContentDirective,
    SnyStatDirective,
    SnyStatTitleDirective,
    SnyStatValueDirective,
    SnyStatDescriptionDirective,
  ],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div snyCard>
        <div snyCardContent class="pt-6">
          <div snyStat>
            <div snyStatTitle class="text-sm font-medium">Proyectos Activos</div>
            <div snyStatValue class="text-2xl font-bold">{{ projectService.activeCount() }}</div>
            <div snyStatDescription variant="default">
              de {{ projectService.totalCount() }} totales
            </div>
          </div>
        </div>
      </div>

      <div snyCard>
        <div snyCardContent class="pt-6">
          <div snyStat>
            <div snyStatTitle class="text-sm font-medium">Tareas Completadas</div>
            <div snyStatValue class="text-2xl font-bold">{{ taskService.completedCount() }}</div>
            <div snyStatDescription variant="success">
              de {{ taskService.totalCount() }} totales
            </div>
          </div>
        </div>
      </div>

      <div snyCard>
        <div snyCardContent class="pt-6">
          <div snyStat>
            <div snyStatTitle class="text-sm font-medium">Items Vencidos</div>
            <div snyStatValue class="text-2xl font-bold">{{ projectService.overdueCount() }}</div>
            <div snyStatDescription variant="error">
              requieren atención
            </div>
          </div>
        </div>
      </div>

      <div snyCard>
        <div snyCardContent class="pt-6">
          <div snyStat>
            <div snyStatTitle class="text-sm font-medium">Miembros del Equipo</div>
            <div snyStatValue class="text-2xl font-bold">{{ userService.count() }}</div>
            <div snyStatDescription>colaboradores activos</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StatsRow {
  protected readonly projectService = inject(ProjectService);
  protected readonly taskService = inject(TaskService);
  protected readonly userService = inject(UserService);
}
