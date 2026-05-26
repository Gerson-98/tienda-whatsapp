// backend/src/submissions/dto/create-submission.dto.ts

import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  // --- AÑADE ESTAS LÍNEAS ---
  @IsString()
  @IsOptional()
  projectType?: string;
  // -------------------------

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
