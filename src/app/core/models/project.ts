export type ProjectStatus = 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface ProjectPhase {
  name: string;
  status: 'default' | 'active' | 'complete' | 'error';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  startDate: string;
  endDate: string;
  progress: number;
  teamMemberIds: string[];
  createdAt: string;
  phases: ProjectPhase[];
}
