export interface ProblemJob{
    userId:string;
    jobId:string;
    problemId:string;
    result:"passed"|"partial"|"failed"|"evaluating";
    createdAt: Date;
    code: string;
    language: 'c' | 'cpp' | 'java' | 'pythone' | 'node';
    jobStatus: 'pending' | 'completed';
    executionTime:number;
   
    startedAt:Date;
    completedAt:Date;
    testCasesResult:any[]


}
