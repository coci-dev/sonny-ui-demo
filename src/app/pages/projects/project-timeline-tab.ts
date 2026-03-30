import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  SnyTimelineDirective,
  SnyTimelineItemDirective,
  SnyTimelineStartDirective,
  SnyTimelineMiddleDirective,
  SnyTimelineEndDirective,
} from '@sonny-ui/core';
import { MOCK_ACTIVITY } from '../../core/data/mock-activity';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-project-timeline-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyTimelineDirective,
    SnyTimelineItemDirective,
    SnyTimelineStartDirective,
    SnyTimelineMiddleDirective,
    SnyTimelineEndDirective,
  ],
  template: `
    <div snyTimeline orientation="vertical">
      @for (event of projectEvents(); track event.id) {
        <div snyTimelineItem [connect]="$first ? 'end' : $last ? 'start' : 'both'">
          <div snyTimelineStart class="text-xs text-muted-foreground w-28 text-right">
            {{ formatDate(event.timestamp) }}
          </div>
          <div snyTimelineMiddle variant="primary"></div>
          <div snyTimelineEnd class="pb-6">
            <p class="text-sm">
              <span class="font-medium">{{ getUserName(event.userId) }}</span>
              {{ event.description }}
            </p>
          </div>
        </div>
      } @empty {
        <p class="text-muted-foreground text-sm">No hay actividad registrada para este proyecto.</p>
      }
    </div>
  `,
})
export class ProjectTimelineTab {
  readonly projectId = input.required<string>();

  private readonly userService = inject(UserService);

  protected readonly projectEvents = computed(() =>
    MOCK_ACTIVITY.filter((a) => a.projectId === this.projectId()),
  );

  protected getUserName(userId: string): string {
    return this.userService.getById(userId)()?.name ?? 'Usuario';
  }

  protected formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleDateString('es', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
