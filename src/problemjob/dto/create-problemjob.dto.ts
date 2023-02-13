export class CreateProblemjobDto {
  userId: string;
  porblemId: string;
  code: string;
  language: 'c' | 'cpp' | 'java' | 'pythone' | 'node';
}
