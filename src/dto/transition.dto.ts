import { IsArray, IsNotEmpty } from 'class-validator';

export class TransitionDto {
  @IsArray()
  @IsNotEmpty()
  transition: string[];
}
