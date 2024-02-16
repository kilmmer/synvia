export type Task = {
    id: number;
    title: string;
    description: string;
    tags: Tags[];
    status: TaskStatus;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type Tags = {
    id?: number;
    name: string;
    type: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}
  