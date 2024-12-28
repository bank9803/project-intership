import { IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
