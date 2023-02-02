import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

export const generateFile = (language: string, code: string): string | null => {
  let ext: string;
  switch (language) {
    case 'cpp':
      ext = 'cpp';
      break;
    case 'c':
      ext = 'c';
      break;
    case 'java':
      ext = 'java';
      break;
    case 'pythone':
      ext = 'py';
      break;
    case 'node':
      ext = 'js';
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
