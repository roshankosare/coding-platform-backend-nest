import { CppRunner } from "./runner/CppRunner";
import { CRunner } from "./runner/CRunner";
import { JavaRunner } from "./runner/JavaRunner";
import { NodeRunner } from "./runner/NodeRunner";
import { PythoneRunner } from "./runner/PythoneRunner";

export class RunnerFactory{

     CreateRunner(language:string){

        switch(language){
            case "c":
                return new CRunner();
            case "cpp":
                return new CppRunner();
            case "java":
                return new JavaRunner();
            case "pythone":
                return new PythoneRunner();
            case "node":
                return new NodeRunner();
        }
    }
}