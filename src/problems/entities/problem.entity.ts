export type TestCase = {
  input: string;
  output: string;
};

export interface Problem {
  autherId:string;
  problemId: string;
  title: string;
  description: string;
  sampleTestCase: TestCase;
  testCase: [TestCase];
  likes: number;
  dislikes: number;
}
