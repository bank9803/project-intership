import { IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
