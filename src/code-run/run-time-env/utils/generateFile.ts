import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

export const generateFile = (language: string, code: string): string | null => {
  let ext: string;
  let sourceFolder:string;
  switch (language) {
    case 'cpp':
      ext = 'cpp';
      sourceFolder = "cpp"
      break;
    case 'c':
      ext = 'c';
      sourceFolder = "c"
      break;
    case 'java':
      ext = 'java';
      sourceFolder = "java"
      break;
    case 'pythone':
      ext = 'py';
      sourceFolder = "pythone"
      break;
    case 'node':
      ext = 'js';
      sourceFolder = "node"
      break;
  }

  let filename: string = uuid();
  filename = `${filename}.${ext}`;
  const folderPath = join(process.cwd(), 'source-codes');

  let filepath = join(folderPath, filename);

  fs.writeFileSync(filepath, code);
  return filepath;
  // if (!filepath) return null;
};
