import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";
import { PassportModule } from "@nestjs/passport";
import { jwtSecrate } from "src/constants/constants";
import { JwtAuthGuard } from "./jwtGuard";
import { JwtStrategy } from "./jwtStrategy";

@Global()
@Module({
    imports:[JwtModule.register({
        secret:jwtSecrate
    }),PassportModule],
    providers:[JwtAuthGuard,JwtStrategy],
    exports:[JwtAuthGuard,JwtStrategy,JwtModule]

})export class AuthencationModule{}