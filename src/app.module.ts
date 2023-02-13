import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ProblemsModule } from './problems/problems.module';
import { ProjectsModule } from './projects/projects.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AuthModule } from './auth/auth.module';
import { CodeRunModule } from './code-run/code-run.module';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemjobModule } from './problemjob/problemjob.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthencationModule } from './jwt/authentication.module';

@Module({
  imports: [
    PostModule,
    ProblemsModule,
    ProjectsModule,
    UserAuthModule,
    UserProfileModule,
    AuthModule,
    CodeRunModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MongooseModule.forRoot('mongodb://localhost/online-code-compiler'),
    ProblemjobModule,
    AuthencationModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
