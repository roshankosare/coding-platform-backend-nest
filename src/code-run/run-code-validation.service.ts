import { Injectable } from "@nestjs/common";
import { CreateCodeRunDto } from "./dto/create-code-run.dto";


@Injectable()
export class CodeRunValidationService {

    validateRunCodeDto(createRunCodeDto:CreateCodeRunDto){

        let errors:string[];
        const {code ,language} = createRunCodeDto;
        if(code === undefined || null || "")
        errors.push("code body is required")

        if(language === undefined || null || "")
        errors.push("language is required")
        
        
        return errors;
    }
}
