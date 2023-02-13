export type TestCase = {
  input: string;
  output: string;
};

export interface Problem {
  problemId: string;
  title: string;
  description: string;
  smapleTestCase: TestCase;
  testCase: [TestCase];
  likes: number;
  dislikes: number;
}
