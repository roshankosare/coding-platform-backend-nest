export interface Job {
  jobId: string;
  createdAt: Date;
  code: string;
  language: 'c' | 'cpp' | 'java' | 'pythone' | 'node';
  jobStatus: 'pending' | 'completed';
  errors: null | string;
  executionTime:number;
  userId:string | null;
  startedAt:Date;
  completedAt:Date;
  output:string;
  
}
