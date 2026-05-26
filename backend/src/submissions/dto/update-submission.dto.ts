// backend/src/submissions/dto/update-submission.dto.ts
import { IsString, IsIn } from 'class-validator';

export class UpdateSubmissionDto {
  @IsString()
  @IsIn(['NUEVO', 'LEIDO']) // Solo permite estos dos valores
  status: string;
}
