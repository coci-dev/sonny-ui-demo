import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  SnyCardDirective,
  SnyCardHeaderDirective,
  SnyCardTitleDirective,
  SnyCardContentDirective,
  SnyTimelineDirective,
  SnyTimelineItemDirective,
  SnyTimelineStartDirective,
  SnyTimelineMiddleDirective,
  SnyTimelineEndDirective,
  SnyBadgeDirective,
} from '@sonny-ui/core';
import { type BadgeVariant, type TimelineMiddleVariant } from '@sonny-ui/core';
import { MOCK_ACTIVITY } from '../../core/data/mock-activity';
import { UserService } from '../../core/services/user';
import { ActivityType } from '../../core/models/activity';

@Component({
  selector: 'app-activity-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SnyCardDirective,
    SnyCardHeaderDirective,
    SnyCardTitleDirective,
    SnyCardContentDirective,
    SnyTimelineDirective,
    SnyTimelineItemDirective,
    SnyTimelineStartDirective,
    SnyTimelineMiddleDirective,
    SnyTimelineEndDirective,
    SnyBadgeDirective,
  ],
  template: `
    <div snyCard>
      <div snyCardHeader>
        <h3 snyCardTitle>Actividad Reciente</h3>
      </div>
      <div snyCardContent>
        <div snyTimeline orientation="vertical">
          @for (event of activities(); track event.id) {
            <div snyTimelineItem [connect]="$first ? 'end' : $last ? 'start' : 'both'">
              <div snyTimelineStart class="text-xs text-muted-foreground w-24 text-right">
                {{ formatTime(event.timestamp) }}
              </div>
              <div snyTimelineMiddle [variant]="getTimelineVariant(event.type)"></div>
              <div snyTimelineEnd class="pb-6">
                <p class="text-sm">
                  <span class="font-medium">{{ getUserName(event.userId) }}</span>
                  {{ event.description }}
                </p>
                <span snyBadge [variant]="getBadgeVariant(event.type)" size="sm" class="mt-1">
                  {{ getLabel(event.type) }}
                </span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ActivityTimeline {
  private readonly userService = inject(UserService);

  protected readonly activities = computed(() => MOCK_ACTIVITY.slice(0, 6));

  protected getUserName(userId: string): string {
    return this.userService.getById(userId)()?.name ?? 'Usuario';
  }

  protected formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Hace minutos';
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString('es');
  }

  protected getTimelineVariant(type: ActivityType): TimelineMiddleVariant {
    const map: Record<ActivityType, TimelineMiddleVariant> = {
      task_completed: 'success',
      project_created: 'primary',
      comment_added: 'default',
      status_changed: 'primary',
      member_added: 'default',
    };
    return map[type];
  }

  protected getBadgeVariant(type: ActivityType): BadgeVariant {
    const map: Record<ActivityType, BadgeVariant> = {
      task_completed: 'success',
      project_created: 'default',
      comment_added: 'secondary',
      status_changed: 'warning',
      member_added: 'outline',
    };
    return map[type];
  }

  protected getLabel(type: ActivityType): string {
    const map: Record<ActivityType, string> = {
      task_completed: 'Completada',
      project_created: 'Nuevo',
      comment_added: 'Comentario',
      status_changed: 'Estado',
      member_added: 'Miembro',
    };
    return map[type];
  }
}
