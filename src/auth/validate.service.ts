import { Injectable } from "@nestjs/common";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import { SignUpUserDto } from "./dto/sing-up-user.dto";


@Injectable()
export class ValidateUserService {

    validateCreateUserDto(user:SignUpUserDto){
        const error:string[] = [];
        const {username ,email,password} = user;
        if(username === undefined || null || "") 
        error.push("username is required");

        if(email === undefined || null || "")
        error.push("email is required");

        if(password === undefined || null || "")
        error.push("password is required");

        return error;
    }
    validateSignInUserDto(user:SignInUserDto){
        const error:string[] = [];
        const {email,password} = user;
       

        if(email === undefined || null || "")
        error.push("email is required");

        if(password === undefined || null || "")
        error.push("password is required");
        
        return error;
    }
}