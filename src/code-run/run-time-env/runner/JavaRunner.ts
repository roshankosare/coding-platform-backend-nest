
import { RunnerBaseClass } from "./RunnerBaseClass";
import { PathAndTool } from "./types";

export class JavaRunner extends RunnerBaseClass{
    async  getRunFilePathAndTool(filepath: string): Promise<PathAndTool | null>{
        
        return null
    }
}