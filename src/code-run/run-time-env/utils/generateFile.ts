import * as fs from 'fs';

import { join } from 'path';


export const generateFile = (language: string, code: string): void => {
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

  let filename: string ;
  filename = `main.${ext}`;
  const folderPath = join(process.cwd(), 'source-codes',sourceFolder);

  let filepath = join(folderPath, filename);

  fs.writeFileSync(filepath, code);
  return ;
  // if (!filepath) return null;
};
