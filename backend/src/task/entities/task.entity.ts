export class TaskEntity {
  id?: number;
  title: string;
  description: string;
  tags: string[];
  status: TaskStatus;
  userId: number;
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
  deletedAt?: Date = new Date();
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
