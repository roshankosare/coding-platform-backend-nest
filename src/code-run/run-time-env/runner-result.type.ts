export type RunnerResult = {
  output?: string;
  status: 'completed' | 'pending';
  errors?: string;
  startedAt?:number;
  completedAt?:number;
};
