import { IsArray, IsNotEmpty } from 'class-validator';

export class TransitionPathDto {
  @IsArray()
  @IsNotEmpty()
  transition: string[];

  @IsArray()
  @IsNotEmpty()
  statuses: number[];
}
