export type ActivityType =
  | 'task_completed'
  | 'project_created'
  | 'comment_added'
  | 'status_changed'
  | 'member_added';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  description: string;
  userId: string;
  projectId: string;
  timestamp: string;
}
