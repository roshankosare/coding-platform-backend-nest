import { PartialType } from '@nestjs/mapped-types';
import { CreateProblemjobDto } from './create-problemjob.dto';

export class UpdateProblemjobDto extends PartialType(CreateProblemjobDto) {}
