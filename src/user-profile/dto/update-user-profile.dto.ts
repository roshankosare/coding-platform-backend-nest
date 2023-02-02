import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProfileDto } from './create-user-profile.dto';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {
    updatedName?: string;
    updatedEmail?: string;
    updateUsername?: string;
    addFollower?: string;
    removeFollower?: string;
    addPost: string;
    removePost: string;
    updateDob: Date;
}
